import React, {ReactNode} from 'react';
import styles from './Round.module.scss';
import {Goby} from '../../components/Goby/Goby';
import {Border} from "../../components/Border/Border";
import {GiveUpButton} from "../../components/GiveUpButton/GiveUpButton";
import {CountdownTimer} from "../../components/CountdownTimer/CountdownTimer";
import {useRoundTimer} from "../../hooks/useRoundTimer";
import {StartButton} from "../../components/StartButton/StartButton";
import cx from 'classnames';
import {GameRound} from "@gobygame/models";


interface RoundProps {
  data: GameRound;
  saveResult: boolean;
  PostRoundOptions: ReactNode,
}

export const Round = ({data, saveResult, PostRoundOptions}: RoundProps) => {
  const {gobies, time, startTimer, hasStarted, isFinished, ref, onClick, onGiveUp} = useRoundTimer(data, saveResult);

  return (
    <Border>
      <CountdownTimer total={10} seconds={time / 1000}/>
      <GiveUpButton onClick={onGiveUp}/>
      <StartButton onClick={startTimer} disabled={gobies.length === 0} display={!hasStarted}/>
      {isFinished && hasStarted &&
        PostRoundOptions
      }
      {gobies.map(goby => (
        <Goby {...goby} display={hasStarted}/>
      ))}
      <div
        ref={ref}
        className={cx(styles.Game, {[styles.Overlay]: !hasStarted || isFinished})}
        onClick={onClick}
      />
    </Border>
  );
};
