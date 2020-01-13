import React from 'react';
import styles from './GamePlotter.module.scss';
import {Border} from "../../components/Border/Border";
import {GobyPlotter} from "../../components/Goby/GobyPlotter";
import {GobyStatus} from "../../components/Goby/Goby";
import {RouteComponentProps} from "react-router-dom";
import {useFetchRound} from "../../hooks/useFetchRound";


export const GamePlotter = ({match}: RouteComponentProps<{round: string}>) => {
  const {gobies, seconds} = useFetchRound(match.params.round);

  return (
    <Border>
      <div className={styles.Plotter}>
        {gobies.map(fish => (
          seconds.map(n => (
            <GobyPlotter
              key={fish.id + n}
              initialPosition={fish.initialPosition}
              nextPositionFn={fish.nextPositionFn}
              moveInterval={fish.moveInterval}
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
