import React from 'react';
import {Round} from "../Round/Round";
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import {useGameRounds} from "../../hooks/gameRoundContext";
import {useLeastPlayedRound} from "../../hooks/useLeastPlayedRound";
import {useUser} from "../../hooks/userContext";
import styles from "./Game.module.scss";
import {CircleButton} from "../../components/CircleButton/CircleButton";
import {Centered} from "../../components/Centered/Centered";


type GameProps = RouteComponentProps<{ round: string }>;

export const Game = ({match}: GameProps) => {
  const [{gameRounds}] = useGameRounds();
  const currentRound = gameRounds.find(round => round.roundId === Number(match.params.round));
  const [user] = useUser();

  const roundsPlayed = Object.values(user.attempts).reduce((a, b) => a + b, 0);

  const preGameMessages = roundsPlayed <= gameRounds.length
    ? (<div>Round {roundsPlayed + 1} of {gameRounds.length}</div>)
    : undefined;

  const postGame = (
    <Centered height={110} width={220}>
      <div className={styles.Message}>
        {roundsPlayed <= gameRounds.length
          ? `Completed ${roundsPlayed} of ${gameRounds.length} rounds!`
          : "You've completed all the rounds!"
        }
      </div>
      <div className={styles.Options}>
        {roundsPlayed >= gameRounds.length &&
        <Link to={'/results'}>
          <CircleButton className={styles.ResultsButton}>
            See Results
          </CircleButton>
        </Link>
        }
        <Link to={'/game'}>
          <CircleButton className={styles.NextRoundButton}>
            {roundsPlayed <= gameRounds.length ? "Next Round" : "Play Another"}
          </CircleButton>
        </Link>
      </div>
    </Centered>
  );

  return currentRound
    ? <Round data={currentRound} saveResult PostRoundOptions={postGame} PreRoundInstructions={preGameMessages}/>
    : <Redirect to={'/game'}/>;
};

export const RandomRound = () => {
  const roundId = useLeastPlayedRound();

  return roundId !== null
    ? <Redirect to={`/game/${roundId}`}/>
    : null;
};
