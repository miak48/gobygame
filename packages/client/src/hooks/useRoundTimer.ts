import {UserActionType, useUser} from "./userContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {TimerStateValues, useTimer} from "react-compound-timer";
import {GobyProps, GobyStatus} from "../components/Goby/Goby";
import {GobyTrajectory} from "./useFetchRound";


interface GobyTimes {
  [key: string]: number;
}

interface UseRoundTimer {
  gobies: GobyProps[];
  time: number;
  startTimer(): void;
  hasStarted: boolean;
  isFinished: boolean;
}

const getFishStatus = (fishTime: number | undefined, timerState: TimerStateValues) => {
  if (fishTime) {
    return GobyStatus.DISCOVERED;
  } else if (timerState === 'STOPPED') {
    return GobyStatus.UNDISCOVERED;
  }
  return GobyStatus.SWIMMING
};

export const useRoundTimer = (trajectories: GobyTrajectory[]): UseRoundTimer => {
  const [user, dispatch] = useUser();
  const [fishTimes, setFishTimes] = useState<GobyTimes>({});
  const {controls, value} = useTimer({timeToUpdate: 16, startImmediately: false});

  controls.setCheckpoints([{
    time: 10000,
    callback: controls.stop
  }]);

  const isFinished = () => Object.values(fishTimes).length === trajectories.length || value.state === 'STOPPED';

  useEffect(() => {
    if (isFinished()) {
      controls.stop();

      const headers = {headers: {'Content-Type': 'application/json'}};
      const data = {
        uuid: user.uuid,
        round: user.round,
        fishOneTime: Object.values(fishTimes)[0],
        fishTwoTime: Object.values(fishTimes)[1],
      };

      axios.post('/api/result', data, headers)
        .then(() => dispatch({type: UserActionType.ROUND_INCREMENT}));
    }
  }, [isFinished()]); // eslint-disable-line

  return {
    gobies: trajectories.map(trajectory => ({
      key: trajectory.id,
      initialPosition: trajectory.initialPosition,
      nextPositionFn: trajectory.nextPositionFn,
      moveInterval: trajectory.moveInterval,
      count: value.s,
      onClick: () => setFishTimes({...fishTimes, [trajectory.id]: controls.getTime()}),
      status: getFishStatus(fishTimes[trajectory.id], value.state),
    })),
    time: controls.getTime(),
    startTimer: controls.start,
    hasStarted: value.state !== 'INITED',
    isFinished: isFinished(),
  }
};
