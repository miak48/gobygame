import React, {useEffect, useState} from 'react';
import styles from './Game.module.scss';
import {Goby} from '../../components/Goby/Goby';
import {Link} from "react-router-dom";
import axios from 'axios';
import {UserActionType, useUser} from "../../context/userContext";
import {Border} from "../../components/Border/Border";
import {GobyPlotter} from "../../components/Goby/GobyPlotter";


interface GameProps {
  startTimer(): void;
  stopTimer(): void;
  getTime(): string;
  secondsElapsed: number;
  timeRemainingPercent: string;
}

export const Game = ({startTimer, stopTimer, getTime, secondsElapsed, timeRemainingPercent}: GameProps) => {
  const [user, dispatch] = useUser();
  const [fishOne, setFishOne] = useState<string | null>(null);
  const [fishTwo, setFishTwo] = useState<string | null>(null);
  useState(() => {
    startTimer();
  });

  const isFinished = () => fishOne !== null && fishTwo !== null;

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
  }, [fishOne, fishTwo]); // eslint-disable-line

  return (
    <Border>
      <div className={styles.Game}>

        <Goby
          initialPosition={{x: 0, y: 100}}
          nextPositionFn={({x, y}) => ({x: x + 100, y: y + 10})}
          count={secondsElapsed}
          moveInterval={1}
          onClick={() => setFishOne(getTime())}
          isFound={fishOne !== null}
        />

        <Goby
          initialPosition={{x: 900, y: 700}}
          nextPositionFn={({x, y}) => ({x: x - 150, y: y - 50})}
          count={secondsElapsed}
          moveInterval={2}
          onClick={() => setFishTwo(getTime())}
          isFound={fishTwo !== null}
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
