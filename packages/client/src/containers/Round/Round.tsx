import React from 'react';
import styles from './Round.module.scss';
import {Goby} from '../../components/Goby/Goby';
import {Border} from "../../components/Border/Border";
import {LinkButton} from "../../components/LinkButton/LinkButton";
import {GiveUpButton} from "../../components/GiveUpButton/GiveUpButton";
import {CountdownTimer} from "../../components/CountdownTimer/CountdownTimer";
import {useRoundTimer} from "../../hooks/useRoundTimer";
import {GobyTrajectory} from "../../hooks/useFetchRound";


interface RoundProps {
  gobyTrajectory: GobyTrajectory[];
}

export const  Round = ({gobyTrajectory}: RoundProps) => {
  const {gobies, time, isFinished} = useRoundTimer(gobyTrajectory);

  return (
    <Border>
      <CountdownTimer total={10} seconds={time / 1000}/>
      <GiveUpButton to={'/results'}/>
      <div className={styles.Game}>

        {gobies.map(goby => (
          <Goby {...goby}/>
        ))}

        {isFinished &&
        <LinkButton to={'/results'}>
          Result
        </LinkButton>
        }
      </div>
    </Border>
  );
};
