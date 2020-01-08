import React, {useEffect, useState} from 'react';
import background from '../../assets/images/gravel2_iphone.jpg';
import styles from './Game.module.scss';
import {Goby} from '../../components/Goby/Goby';
import {Link} from "react-router-dom";
import axios from 'axios';
import {useUser} from "../../context/userContext";
import Border from "../../components/Border/Border";


const Game = ({startTimer, stopTimer, getTime, secondsElapsed, timeRemainingPercent}) => {
  const [user, dispatch] = useUser();
  const [fishOne, setFishOne] = useState(null);
  const [fishTwo, setFishTwo] = useState(null);
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

      axios.post('/api/results', data, headers)
        .then(() => dispatch({type: 'ROUND_INCREMENT'}));
    }
  }, [fishOne, fishTwo]);

  return (
    <Border>
      <div className={styles.Game}>

        <Goby
          initialPosition={{x: 0, y: 100}}
          nextPositionFn={({x, y}) => ({x: x + 80, y: y})}
          count={secondsElapsed}
          moveInterval={1}
          onClick={() => setFishOne(getTime())}
          isFound={fishOne !== null}
        />

        <Goby
          initialPosition={{x: 100, y: 0}}
          nextPositionFn={({x, y}) => ({x: x, y: y + 80})}
          count={secondsElapsed}
          moveInterval={1}
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

export default Game;
