import React from 'react';
import styles from './GamePlotter.module.scss';
import {Border} from "../../components/Border/Border";
import {Goby, GobyStatus} from "../../components/Goby/Goby";
import {RouteComponentProps} from "react-router-dom";
import {useFetchRound} from "../../hooks/useFetchRound";


export const GamePlotter = ({match}: RouteComponentProps<{round: string}>) => {
  const gameRound = useFetchRound(match.params.round);
  const seconds = [...Array(gameRound ? (gameRound.timeLimit * 10) : 0).keys()];

  return (
    <Border>
      <div className={styles.Plotter}>
        {gameRound?.gobies.map(trajectory => (
          seconds.map(n => (
            <Goby
              key={trajectory.gobyId + n}
              gobyId={trajectory.gobyId}
              bearing={trajectory.initialBearing}
              position={trajectory.positions[n]}
              onClick={() => console.log('click')}
              status={GobyStatus.SWIMMING}
              image={trajectory.image}
              display={true}
            />
          ))
        ))}
      </div>
    </Border>
  );
};
