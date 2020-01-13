import React, {useEffect, useState} from 'react';
import styles from './Round.module.scss';
import {Goby, GobyStatus} from '../../components/Goby/Goby';
import axios from 'axios';
import {UserActionType, useUser} from "../../hooks/userContext";
import {Border} from "../../components/Border/Border";
import {TimerStateValues, useTimer} from "react-compound-timer";
import {Coordinate} from "../../utilities/geometry";
import {LinkButton} from "../../components/LinkButton/LinkButton";
import {GiveUpButton} from "../../components/GiveUpButton/GiveUpButton";
import {CountdownTimer} from "../../components/CountdownTimer/CountdownTimer";


export interface Fish {
  id: string;
  nextPositionFn(a: Coordinate): Coordinate;
  initialPosition: Coordinate;
  moveInterval: number;
}

interface RoundProps {
  fish: Fish[];
}

interface FishTimes {
  [key: string]: number;
}

const getFishStatus = (fishTime: number | undefined, timerState: TimerStateValues) => {
  if (fishTime) {
    return GobyStatus.DISCOVERED;
  } else if (timerState === 'STOPPED') {
    return GobyStatus.UNDISCOVERED;
  }
  return GobyStatus.SWIMMING
};

export const  Round = ({fish}: RoundProps) => {

  const {controls, value} = useTimer({
    timeToUpdate: 16,
    startImmediately: false,
  });

  const [user, dispatch] = useUser();
  const [fishTimes, setFishTimes] = useState<FishTimes>({});
  useState(() => {
    controls.start();
  });

  const isFinished = () => Object.values(fishTimes).length === fish.length || value.state === 'STOPPED';

  useEffect(() => {
    if (isFinished()) {
      controls.stop();

      const headers = {headers: {'Content-Type': 'application/json'}};
      const data = {
        uuid: user.uuid,
        round: user.round,
        fishOneTime: Object.values(fishTimes)[0],
        fishTwoTime: Object.values(fishTimes)[1],
      };

      axios.post('/api/result', data, headers)
        .then(() => dispatch({type: UserActionType.ROUND_INCREMENT}));
    }
  }, [isFinished()]); // eslint-disable-line

  return (
    <Border>
      <CountdownTimer total={10} seconds={controls.getTime() / 1000}/>
      <GiveUpButton to={'/results'}/>
      <div className={styles.Game}>

        {fish.map(fish => (
          <Goby
            key={fish.id}
            initialPosition={fish.initialPosition}
            nextPositionFn={fish.nextPositionFn}
            moveInterval={fish.moveInterval}
            count={value.s}
            onClick={() => setFishTimes({...fishTimes, [fish.id]: controls.getTime()})}
            status={getFishStatus(fishTimes[fish.id], value.state)}
          />
        ))}

        {isFinished() &&
        <LinkButton to={'/results'}>
          Result
        </LinkButton>
        }
      </div>
    </Border>
  );
};
