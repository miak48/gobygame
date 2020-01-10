import React, {useEffect, useState} from 'react';
import styles from './Game.module.scss';
import {Goby, GobyStatus} from '../../components/Goby/Goby';
import {Link} from "react-router-dom";
import axios from 'axios';
import {UserActionType, useUser} from "../../context/userContext";
import {Border} from "../../components/Border/Border";
import {TimerStateValues} from "react-compound-timer";


interface GameProps {
  startTimer(): void;
  stopTimer(): void;
  getTime(): number;
  secondsElapsed: number;
  timeRemainingPercent: string;
  timerState: TimerStateValues;
}

export const Game = ({startTimer, stopTimer, getTime, secondsElapsed, timeRemainingPercent, timerState}: GameProps) => {
  const [user, dispatch] = useUser();
  const [fishOne, setFishOne] = useState<number | null>(null);
  const [fishTwo, setFishTwo] = useState<number | null>(null);
  useState(() => {
    startTimer();
  });

  const isFinished = () => (fishOne !== null && fishTwo !== null) || timerState === 'STOPPED';

  useEffect(() => {
    if (isFinished()) {
      stopTimer();

      const headers = {headers: {'Content-Type': 'application/json'}};
      const data = {
        uuid: user.uuid,
        round: user.round,
        fishOneTime: fishOne,
        fishTwoTime: fishTwo,
      };

      axios.post('/api/result', data, headers)
        .then(() => dispatch({type: UserActionType.ROUND_INCREMENT}));
    }
  }, [fishOne, fishTwo, isFinished()]); // eslint-disable-line

  const getFishStatus = (fishTime: number | null) => {
    if (fishTime !== null) {
      return GobyStatus.DISCOVERED;
    } else if (timerState === 'STOPPED') {
      return GobyStatus.UNDISCOVERED;
    }
    return GobyStatus.SWIMMING
  };

  return (
    <Border>
      <div className={styles.Game}>

        <Goby
          initialPosition={{x: 0, y: 100}}
          nextPositionFn={({x, y}) => ({x: x + 100, y: y + 10})}
          count={secondsElapsed}
          moveInterval={1}
          onClick={() => setFishOne(getTime())}
          status={getFishStatus(fishOne)}
        />

        <Goby
          initialPosition={{x: 900, y: 600}}
          nextPositionFn={({x, y}) => ({x: x - 150, y: y - 50})}
          count={secondsElapsed}
          moveInterval={2}
          onClick={() => setFishTwo(getTime())}
          status={getFishStatus(fishTwo)}
        />

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
