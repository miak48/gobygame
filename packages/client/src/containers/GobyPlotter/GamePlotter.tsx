import React from 'react';
import styles from './GamePlotter.module.scss';
import {Border} from "../../components/Border/Border";
import {GobyPlotter} from "../../components/Goby/GobyPlotter";
import {GobyStatus} from "../../components/Goby/Goby";
import {RouteComponentProps} from "react-router-dom";
import {useFetchRound} from "../../hooks/useFetchRound";


export const GamePlotter = ({match}: RouteComponentProps<{round: string}>) => {
  const {trajectories, seconds} = useFetchRound(match.params.round);

  return (  
    <Border>
      <div className={styles.Plotter}>
        {trajectories.map(trajectory => (
          seconds.map(n => (
            <GobyPlotter
              key={trajectory.id + n}
              initialPosition={trajectory.initialPosition}
              nextPositionFn={trajectory.nextPositionFn}
              moveInterval={trajectory.moveInterval}
              count={n}
              onClick={() => console.log('click')}
              status={GobyStatus.SWIMMING}
            />
          ))
        ))}
      </div>
    </Border>
  );
};
