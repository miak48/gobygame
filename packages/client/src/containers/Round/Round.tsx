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
import {Centered} from "../../components/Centered/Centered";


interface RoundProps {
  data: GameRound;
  saveResult: boolean;
  PostRoundOptions: ReactNode;
  PreRoundInstructions: ReactNode;
}

export const Round = ({data, saveResult, PostRoundOptions, PreRoundInstructions}: RoundProps) => {
  const {gobies, time, startTimer, hasStarted, isFinished, ref, onClick, onGiveUp} = useRoundTimer(data, saveResult);

  return (
    <Border>
      <CountdownTimer total={10} seconds={time / 1000}/>
      <GiveUpButton onClick={onGiveUp}/>
      {!hasStarted &&
        <Centered height={135} width={'100%'}>
          {PreRoundInstructions}
          <StartButton onClick={startTimer}/>
        </Centered>
      }
      {isFinished && hasStarted && PostRoundOptions}
      {gobies.map(goby => (
        <Goby {...goby} display={hasStarted}/>
      ))}
      <div
        ref={ref}
        className={cx(styles.Game, {[styles.Overlay]: !hasStarted || isFinished})}
        style={{
          zIndex: !hasStarted ? 7 : 0,
        }}
        onClick={onClick}
      />
    </Border>
  );
};
