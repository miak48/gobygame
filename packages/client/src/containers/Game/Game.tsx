import React, {useEffect, useState} from 'react';
import styles from './Game.module.scss';
import {Goby, GobyStatus} from '../../components/Goby/Goby';
import {Link} from "react-router-dom";
import axios from 'axios';
import {UserActionType, useUser} from "../../context/userContext";
import {Border} from "../../components/Border/Border";
import {TimerStateValues} from "react-compound-timer";
import {Coordinate} from "../../utilities/geometry";


export interface Fish {
  id: string;
  nextPositionFn(a: Coordinate): Coordinate;
  initialPosition: Coordinate;
  moveInterval: number;
}

interface GameProps {
  startTimer(): void;
  stopTimer(): void;
  getTime(): number;
  secondsElapsed: number;
  timeRemainingPercent: string;
  timerState: TimerStateValues;
  fish: Fish[];
}

interface FishTimes {
  [key: string]: number | null;
}

const getFishStatus = (fishTime: number | null, timerState: TimerStateValues) => {
  if (fishTime !== null) {
    return GobyStatus.DISCOVERED;
  } else if (timerState === 'STOPPED') {
    return GobyStatus.UNDISCOVERED;
  }
  return GobyStatus.SWIMMING
};

export const Game = ({startTimer, stopTimer, getTime, secondsElapsed, timeRemainingPercent, timerState, fish}: GameProps) => {
  const [user, dispatch] = useUser();
  const [fishTimes, setFishTimes] = useState<FishTimes>(() => fish.reduce((acc, fish) => {
    acc[fish.id] = null;
    return acc;
  }, {} as FishTimes));
  useState(() => {
    startTimer();
  });

  const isFinished = () => !Object.values(fishTimes).includes(null) || timerState === 'STOPPED';

  useEffect(() => {
    if (isFinished()) {
      stopTimer();

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

  return (
    <Border>
      <div className={styles.Game}>

        {fish.map(fish => (
          <Goby
            key={fish.id}
            initialPosition={fish.initialPosition}
            nextPositionFn={fish.nextPositionFn}
            moveInterval={fish.moveInterval}
            count={secondsElapsed}
            onClick={() => setFishTimes({...fishTimes, [fish.id]: getTime()})}
            status={getFishStatus(fishTimes[fish.id], timerState)}
          />
        ))}

        <div className={styles.Timer} style={{width: timeRemainingPercent}}/>

        {isFinished() &&
        <Link to='/results'>
          <button className={styles.CustomButton}>
            Result
          </button>
        </Link>
        }
      </div>
    </Border>
  );
};
