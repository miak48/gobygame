import React, {useState} from 'react';
import styles from './GamePlotter.module.scss';
import {Border} from "../../components/Border/Border";
import {GobyPlotter} from "../../components/Goby/GobyPlotter";
import {GobyStatus} from "../../components/Goby/Goby";
import {Fish} from "../Round/Round";
import axios from "axios";
import {RouteComponentProps} from "react-router-dom";


const transformNextPositionFn = (rawGoby: any): Fish => {
  // eslint-disable-next-line no-new-func
  rawGoby.nextPositionFn = new Function("{x, y}", rawGoby.nextPositionFn);

  return rawGoby;
};

export const GamePlotter = ({match}: RouteComponentProps<{round: string}>) => {
  const [gobies, setGobies] = useState<Fish[]>([]);
  const [seconds, setSeconds] = useState<number[]>([]);

  useState(() => {
    async function fetchRounds() {
      const response = await axios
        .get(`/api/round/${match.params.round}`);

      const round = response.data.data;
      setGobies(round.gobies.map(transformNextPositionFn));
      setSeconds([...Array(round.timeLimit).keys()]);
    }

    fetchRounds()
  });

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
