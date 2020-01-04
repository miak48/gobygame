import React, {useContext, useEffect, useState} from 'react';
import background from '../../assets/images/gravel2_iphone.jpg';
import styles from './Game.module.scss';
import {Goby} from '../../components/Goby/Goby';
import {Link} from "react-router-dom";
import axios from 'axios';
import UserContext from "../../context/userContext";


const Game = ({totalTime}) => {
  const [count, setCount] = useState(totalTime);
  const [isActive, setIsActive] = useState(true);
  const user = useContext(UserContext);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setCount(count => count - 1);
      }, 1000);
    } else if (!isActive && count !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, count]);


  useEffect(() => {
    if (count === 0) {
      setIsActive(false);
    }
  }, [count]);

  useEffect(() => {
    if (!isActive) {
      async function b() {
        const response = await axios.post(
          'http://localhost:8000/api/result',
          {
            uuid: user.uuid,
            round: 1,
            time: totalTime - count,
          },
          {headers: {'Content-Type': 'application/json'}}
        );

        console.log(response.data)
      }

      b();
    }
  }, [isActive]);

  console.log('Game', count)

  return (
    <div className={styles.Game}>
      <img src={background} className={styles.backgroundGravel}/>

      <Goby
        initialPosition={{x: 0, y: 100}}
        nextPositionFn={({x, y}) => ({x: x + 80, y: y})}
        count={totalTime - count}
        moveInterval={5}
        onClick={() => setIsActive(false)}
        isFound={!isActive}
      />

      <Goby
        initialPosition={{x: 100, y: 0}}
        nextPositionFn={({x, y}) => ({x: x, y: y + 80})}
        count={totalTime - count}
        moveInterval={1}
        onClick={() => setIsActive(false)}
        isFound={!isActive}
      />

      <div className={styles.timer} style={{width: (count / totalTime) * 100 + '%'}}/>

      {!isActive &&
      <Link to='/result'>
        <button className={styles.CustomButton}>
          Result
        </button>
      </Link>
      }
    </div>
  );
};

Game.defaultProps = {
  totalTime: 30,
};

export default Game;
