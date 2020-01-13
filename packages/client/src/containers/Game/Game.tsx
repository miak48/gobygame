import React from 'react';
import {useFetchRound} from "../../hooks/useFetchRound";
import {Round} from "../Round/Round";


export const Game = () => {
  const id = Math.floor(Math.random() * 3) + 1;
  const {gobies} = useFetchRound(id.toString());

  return gobies.length > 0 ? (
    <Round
      fish={gobies}
    />
  ) : null
};
