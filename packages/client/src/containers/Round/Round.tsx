import React from 'react';
import styles from './Round.module.scss';
import {Goby} from '../../components/Goby/Goby';
import {Border} from "../../components/Border/Border";
import {GiveUpButton} from "../../components/GiveUpButton/GiveUpButton";
import {CountdownTimer} from "../../components/CountdownTimer/CountdownTimer";
import {useRoundTimer} from "../../hooks/useRoundTimer";
import {GobyTrajectory} from "../../hooks/useFetchRound";
import {StartButton} from "../../components/StartButton/StartButton";
import cx from 'classnames';
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {CircleButton} from "../../components/CircleButton/CircleButton";


interface RoundProps extends RouteComponentProps {
  gobyTrajectory: GobyTrajectory[];
}

export const Round = withRouter(({gobyTrajectory, history}: RoundProps) => {
  const {gobies, time, startTimer, hasStarted, isFinished} = useRoundTimer(gobyTrajectory);

  return (
    <Border>
      <CountdownTimer total={10} seconds={time / 1000}/>
      <GiveUpButton to={'/results'}/>
      <StartButton onClick={startTimer} disabled={gobies.length === 0} display={!hasStarted}/>
      {isFinished && hasStarted &&
      <div className={styles.Centered}>
        <Link to={'/results'}>
          <CircleButton className={styles.ResultsButton}>
            End
          </CircleButton>
        </Link>
        <Link to={'/game'}>
          <CircleButton className={styles.NextRoundButton}>
            Next Round
          </CircleButton>
        </Link>
      </div>
      }
      <div className={cx(styles.Game, {[styles.Overlay]: !hasStarted || isFinished})}>
        {hasStarted && gobies.map(goby => (
          <Goby {...goby}/>
        ))}
      </div>
    </Border>
  );
});
