import React, {useState, useEffect} from 'react';
import background from '../../assets/images/gravel2_iphone.jpg';
import styles from './Game.module.scss';
import goby_fig from './assets/realgoby.png';
import goby_fig2 from './assets/realgoby2.png';
import { Goby } from '../../components/Goby/Goby';


function Game({totalTime}) {
    const [count, setCount] = useState(totalTime);
    const [isActive, setIsActive] = useState(true);

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
    } ,[count]);

    console.log('Game', count)


    return (
        <div className={styles.Game}>
            hello World
            <img src={goby_fig} className={styles.gobyimage}/>
            <img src={goby_fig2} className={styles.gobyimage2}/>
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
        </div>
    );
}

Game.defaultProps = {
    totalTime: 30,
};

export default Game;
