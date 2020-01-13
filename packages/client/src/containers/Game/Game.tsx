import React from 'react';
import {useFetchRound} from "../../hooks/useFetchRound";
import {Round} from "../Round/Round";


export const Game = () => {
  const id = Math.floor(Math.random() * 3) + 1;
  const {trajectories} = useFetchRound(id.toString());

  return trajectories.length > 0
    ? (<Round gobyTrajectory={trajectories}/>)
    : null
};
