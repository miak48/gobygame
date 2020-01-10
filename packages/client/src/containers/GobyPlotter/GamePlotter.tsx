import React from 'react';
import styles from './GamePlotter.module.scss';
import {Border} from "../../components/Border/Border";
import {GobyPlotter} from "../../components/Goby/GobyPlotter";
import {GobyStatus} from "../../components/Goby/Goby";


export const GamePlotter = () => {
  const tenSeconds = [...Array(10).keys()];

  return (
    <Border>
      <div className={styles.Plotter}>

        {tenSeconds.map(n => (
          <GobyPlotter
            key={n}
            initialPosition={{x: 0, y: 100}}
            nextPositionFn={({x, y}) => ({x: x + 100, y: y + 10})}
            count={n}
            moveInterval={1}
            onClick={() => console.log('click')}
            status={GobyStatus.SWIMMING}
          />
        ))}

        {tenSeconds.map(n => (
          <GobyPlotter
            key={n}
            initialPosition={{x: 900, y: 700}}
            nextPositionFn={({x, y}) => ({x: x - 100, y: y - 10})}
            count={n}
            moveInterval={2}
            onClick={() => console.log('click')}
            status={GobyStatus.SWIMMING}
          />
        ))}

      </div>
    </Border>
  );
};
