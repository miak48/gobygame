import {useState} from "react";
import axios from "axios";
import {Coordinate} from "@gobygame/models";
import {GameRound} from "@gobygame/models";
import {GobyTrajectory} from "@gobygame/models";


export interface GobyTrajectoryTransformed extends Omit<GobyTrajectory, 'nextPositionFn'> {
  nextPositionFn(a: Coordinate): Coordinate;
}

export interface GameRoundTransformed extends Omit<GameRound, 'gobies'> {
  gobies: GobyTrajectoryTransformed[];
}

const transformNextPositionFn = (gobyTrajectory: GobyTrajectory): GobyTrajectoryTransformed => {
  return {
    ...gobyTrajectory,
    // eslint-disable-next-line no-new-func
    nextPositionFn: new Function("{x, y}", gobyTrajectory.nextPositionFn)
  } as GobyTrajectoryTransformed;
};

export const useFetchRound = (id: string): GameRoundTransformed | null => {
  const [gameRound, setGameRound] = useState<GameRoundTransformed | null>(null);

  useState(() => {
    async function fetchRounds() {
      const response = await axios
        .get(`/api/round/${id}`);

      const round: GameRound = response.data.data;
      setGameRound({
        ...round,
        gobies: round.gobies.map(transformNextPositionFn),
      });
    }

    fetchRounds()
  });

  return gameRound;
};
