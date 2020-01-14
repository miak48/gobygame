import React from 'react';
import {useFetchRound} from "../../hooks/useFetchRound";
import {Round} from "../Round/Round";
import {Redirect, RouteComponentProps} from 'react-router-dom';


type GameProps = RouteComponentProps<{ round: string }>;

export const Game = ({match}: GameProps) => {
  const {trajectories} = useFetchRound(match.params.round);

  console.log('Game', match.params.round)

  return (
    <Round gobyTrajectory={trajectories}/>
  );
};

export const RandomRound = () => {
  const id = Math.floor(Math.random() * 3) + 1;

  return (
    <Redirect to={`/game/${id}`}/>
  );
};
