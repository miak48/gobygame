import {useUser} from "./userContext";
import {RoundActions, useGameRounds} from "./gameRoundContext";
import {useState} from "react";


export const useLeastPlayedRound = (): number | null => {
  const [user] = useUser();
  const [{gameRounds}, dispatch] = useGameRounds();

  useState(() => {
    if (gameRounds.length === 0) {
      dispatch({type: RoundActions.FETCH_ROUNDS_REQUEST});
    }
  });

  const allAttempts = gameRounds.map(round => ({
    attempts: user.attempts[round.roundId] ?? 0,
    roundId: round.roundId
  }));

  const minAttempts = Math.min(...allAttempts.map(a => a.attempts));
  const leastPlayedRounds = allAttempts.filter(b => b.attempts === minAttempts);
  const randomlySelectedLeastPlayedRound = Math.floor(Math.random() * leastPlayedRounds.length);

  return leastPlayedRounds[randomlySelectedLeastPlayedRound]?.roundId ?? null;
};
