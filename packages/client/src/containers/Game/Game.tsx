import React from 'react';
import {Round} from "../Round/Round";
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {useGameRounds} from "../../hooks/gameRoundContext";
import {useLeastPlayedRound} from "../../hooks/useLeastPlayedRound";


type GameProps = RouteComponentProps<{ round: string }>;

export const Game = ({match}: GameProps) => {
  const [{gameRounds}] = useGameRounds();
  const currentRound = gameRounds.find(round => round.roundId === Number(match.params.round));

  return currentRound
    ? <Round data={currentRound}/>
    : <Redirect to={'/game'}/>;
};

export const RandomRound = () => {
  const roundId = useLeastPlayedRound();

  return roundId !== null
    ? <Redirect to={`/game/${roundId}`}/>
    : null;
};
