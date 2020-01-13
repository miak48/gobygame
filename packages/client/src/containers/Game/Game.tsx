import React from 'react';
import {RoundTimer} from "../Round/RoundTimer";
import {useFetchRound} from "../../hooks/useFetchRound";


export const Game = () => {
  const id = Math.floor(Math.random() * 3) + 1;
  const {gobies} = useFetchRound(id.toString());

  return (
    <RoundTimer
      fish={gobies}
    />
  )
};
