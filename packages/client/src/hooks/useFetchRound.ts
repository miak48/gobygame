import {useState} from "react";
import axios from "axios";
import {Coordinate} from "../utilities/geometry";


export interface GobyTrajectory {
  id: string;
  nextPositionFn(a: Coordinate): Coordinate;
  initialPosition: Coordinate;
  moveInterval: number;
}

interface UseFetchRound {
  trajectories: GobyTrajectory[];
  seconds: number[];
}

const transformNextPositionFn = (rawGoby: any): GobyTrajectory => {
  // eslint-disable-next-line no-new-func
  rawGoby.nextPositionFn = new Function("{x, y}", rawGoby.nextPositionFn);

  return rawGoby;
};

export const useFetchRound = (id: string): UseFetchRound => {
  const [trajectories, setTrajectories] = useState<GobyTrajectory[]>([]);
  const [seconds, setSeconds] = useState<number[]>([]);

  useState(() => {
    async function fetchRounds() {
      const response = await axios
        .get(`/api/round/${id}`);

      const round = response.data.data;
      setTrajectories(round.gobies.map(transformNextPositionFn));
      setSeconds([...Array(round.timeLimit).keys()]);
    }

    fetchRounds()
  });

  return {trajectories, seconds}
};
