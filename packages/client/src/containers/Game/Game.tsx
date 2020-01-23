import React from 'react';
import {Round} from "../Round/Round";
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import {useGameRounds} from "../../hooks/gameRoundContext";
import {useLeastPlayedRound} from "../../hooks/useLeastPlayedRound";
import {useUser} from "../../hooks/userContext";
import styles from "./Game.module.scss";
import {CircleButton} from "../../components/CircleButton/CircleButton";


type GameProps = RouteComponentProps<{ round: string }>;

export const Game = ({match}: GameProps) => {
  const [{gameRounds}] = useGameRounds();
  const currentRound = gameRounds.find(round => round.roundId === Number(match.params.round));
  const [user] = useUser();

  const roundsPlayed = Object.values(user.attempts).reduce((a, b) => a + b, 0);

  const postGame = (
    <div className={styles.Centered}>
      <div className={styles.Message}>
        {roundsPlayed <= gameRounds.length
          ? `Completed ${roundsPlayed} of ${gameRounds.length} rounds!`
          : "You've completed the game!"
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
    </div>
  );

  return currentRound
    ? <Round data={currentRound} saveResult PostRoundOptions={postGame}/>
    : <Redirect to={'/game'}/>;
};

export const RandomRound = () => {
  const roundId = useLeastPlayedRound();

  return roundId !== null
    ? <Redirect to={`/game/${roundId}`}/>
    : null;
};
