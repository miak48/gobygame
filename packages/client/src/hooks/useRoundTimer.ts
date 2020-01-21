import {UserActionType, useUser} from "./userContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {TimerStateValues, useTimer} from "react-compound-timer";
import {GobyProps, GobyStatus} from "../components/Goby/Goby";
import {CatchTime, Coordinate, GameRound, RoundResult} from "@gobygame/models";
import {useClickTracker, UseClickTracker} from "./useClickTracker";


interface GobyTimes {
  [key: string]: CatchTime | null;
}

interface UseRoundTimer extends Omit<UseClickTracker, 'clicks'> {
  gobies: GobyProps[];
  time: number;
  startTimer(): void;
  hasStarted: boolean;
  isFinished: boolean;
}

const getFishStatus = (catchTime: CatchTime | null, timerState: TimerStateValues) => {
  if (catchTime) {
    return GobyStatus.DISCOVERED;
  } else if (timerState === 'STOPPED') {
    return GobyStatus.UNDISCOVERED;
  }
  return GobyStatus.SWIMMING
};

export const useRoundTimer = (roundData: GameRound): UseRoundTimer => {
  const [user, dispatch] = useUser();

  const [catchTimes, setCatchTimes] = useState<GobyTimes>(() => {
    return roundData.gobies.reduce((gobyTimes, goby) => {
      return {...gobyTimes, [goby.gobyId]: null};
    }, {})
  });

  const {controls, value} = useTimer({timeToUpdate: 16, startImmediately: false});
  useState(() => {
    if (roundData?.timeLimit) {
      controls.setCheckpoints([{
        time: roundData.timeLimit * 1000,
        callback: controls.stop
      }]);
    }
  });

  const recordCatchTime = (id: string) => (coordinate: Coordinate) => {
    const catchTime: CatchTime = {
      gobyId: id,
      time: controls.getTime(),
      position: coordinate
    };

    setCatchTimes({...catchTimes, [id]: catchTime})
  };

  const decisecond = Math.trunc(controls.getTime() / 100);

  const gobyProps = roundData?.gobies.map(trajectory => {
    return {
      key: trajectory.gobyId,
      gobyId: trajectory.gobyId,
      position: catchTimes[trajectory.gobyId]?.position ?? trajectory.positions[decisecond],
      onClick: recordCatchTime(trajectory.gobyId),
      status: getFishStatus(catchTimes[trajectory.gobyId], value.state),
      bearing: trajectory.initialBearing,
      image: trajectory.image,
    }
  }) ?? [];

  const {clicks, onClick, ref} = useClickTracker(gobyProps, controls.getTime);

  const isFinished = () => !Object.values(catchTimes).includes(null) || value.state === 'STOPPED';

  useEffect(() => {
    if (isFinished()) {
      controls.stop();

      const headers = {headers: {'Content-Type': 'application/json'}};
      const data: RoundResult = {
        uuid: user.uuid,
        roundId: roundData.roundId,
        attempt: (user.attempts[String(roundData.roundId)] ?? 0) + 1,
        totalTime: controls.getTime(),
        foundAll: roundData.gobies.length === Object.values(catchTimes).length,
        catchTimes: Object.entries(catchTimes).map(entry => ({gobyId: entry[0], catchTime: entry[1]})),
        missedClicks: clicks, // TODO: Currently only tracking missed clicks
      };

      axios.post('/api/result', data, headers)
        .then(() => dispatch({type: UserActionType.ROUND_INCREMENT, roundId: roundData.roundId}));
    }
  }, [isFinished()]); // eslint-disable-line

  return {
    onClick,
    ref,
    gobies: gobyProps,
    time: controls.getTime(),
    startTimer: controls.start,
    hasStarted: value.state !== 'INITED',
    isFinished: isFinished(),
  }
};
