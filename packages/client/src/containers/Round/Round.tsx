import React from 'react';
import styles from './Round.module.scss';
import {Goby} from '../../components/Goby/Goby';
import {Border} from "../../components/Border/Border";
import {LinkButton} from "../../components/LinkButton/LinkButton";
import {GiveUpButton} from "../../components/GiveUpButton/GiveUpButton";
import {CountdownTimer} from "../../components/CountdownTimer/CountdownTimer";
import {useRoundTimer} from "../../hooks/useRoundTimer";
import {GobyTrajectory} from "../../hooks/useFetchRound";
import {StartButton} from "../../components/StartButton/StartButton";
import cx from 'classnames';


interface RoundProps {
  gobyTrajectory: GobyTrajectory[];
}

export const  Round = ({gobyTrajectory}: RoundProps) => {
  const {gobies, time, startTimer, hasStarted, isFinished} = useRoundTimer(gobyTrajectory);

  return (
    <Border>
      <CountdownTimer total={10} seconds={time / 1000}/>
      <GiveUpButton to={'/results'}/>
      <StartButton onClick={startTimer} disabled={gobies.length === 0} display={!hasStarted}/>
      <div className={cx(styles.Game, {[styles.Overlay]: !hasStarted})}>

        {hasStarted && gobies.map(goby => (
          <Goby {...goby}/>
        ))}

        {isFinished && hasStarted &&
        <LinkButton to={'/results'}>
          Result
        </LinkButton>
        }
      </div>
    </Border>
  );
};
