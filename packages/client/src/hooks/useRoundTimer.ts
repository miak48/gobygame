import {UserActionType, useUser} from "./userContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {TimerStateValues, useTimer} from "react-compound-timer";
import {GobyProps, GobyStatus} from "../components/Goby/Goby";
import {GameRoundTransformed} from "./useFetchRound";
import {RoundResult, CatchTime} from "@gobygame/models";
import {Coordinate} from "@gobygame/models";


interface GobyTimes {
  [key: string]: CatchTime;
}

interface UseRoundTimer {
  gobies: GobyProps[];
  time: number;
  startTimer(): void;
  hasStarted: boolean;
  isFinished: boolean;
}

const getFishStatus = (catchTime: CatchTime | undefined, timerState: TimerStateValues) => {
  if (catchTime) {
    return GobyStatus.DISCOVERED;
  } else if (timerState === 'STOPPED') {
    return GobyStatus.UNDISCOVERED;
  }
  return GobyStatus.SWIMMING
};

export const useRoundTimer = (roundData: GameRoundTransformed | null): UseRoundTimer => {
  const [user, dispatch] = useUser();
  const [catchTimes, setCatchTimes] = useState<GobyTimes>({});
  const {controls, value} = useTimer({timeToUpdate: 16, startImmediately: false});

  controls.setCheckpoints([{
    time: 10000,
    callback: controls.stop
  }]);

  const isFinished = () => Boolean(roundData)
    && (Object.values(catchTimes).length === roundData?.gobies.length || value.state === 'STOPPED');

  useEffect(() => {
    if (isFinished()) {
      controls.stop();

      const headers = {headers: {'Content-Type': 'application/json'}};
      const data: RoundResult = {
        uuid: user.uuid,
        roundId: roundData!.roundId,
        attempt: 1,
        totalTime: controls.getTime(),
        numberOfGobies: roundData!.gobies.length,
        foundAll: roundData!.gobies.length === Object.values(catchTimes).length,
        catchTimes: Object.values(catchTimes),
        clicks: [],
      };

      axios.post('/api/result', data, headers)
        .then(() => dispatch({type: UserActionType.ROUND_INCREMENT}));
    }
  }, [isFinished()]); // eslint-disable-line


  const recordTime = (id: string) => (coordinate: Coordinate) => {
    const catchTime: CatchTime = {
      gobyId: id,
      time: controls.getTime(),
      position: coordinate
    };

    setCatchTimes({...catchTimes, [id]: catchTime})
  };

  return {
    gobies: roundData?.gobies.map(trajectory => ({
      key: trajectory.id,
      initialPosition: trajectory.initialPosition,
      nextPositionFn: trajectory.nextPositionFn,
      moveInterval: trajectory.moveInterval,
      count: value.s,
      onClick: recordTime(trajectory.id),
      status: getFishStatus(catchTimes[trajectory.id], value.state),
    })) ?? [],
    time: controls.getTime(),
    startTimer: controls.start,
    hasStarted: value.state !== 'INITED',
    isFinished: isFinished(),
  }
};
