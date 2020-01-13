import {Fish} from "../containers/Round/Round";
import {useState} from "react";
import axios from "axios";


const transformNextPositionFn = (rawGoby: any): Fish => {
  // eslint-disable-next-line no-new-func
  rawGoby.nextPositionFn = new Function("{x, y}", rawGoby.nextPositionFn);

  return rawGoby;
};

export const useFetchRound = (id: string): {gobies: Fish[], seconds: number[]} => {
  const [gobies, setGobies] = useState<Fish[]>([]);
  const [seconds, setSeconds] = useState<number[]>([]);

  useState(() => {
    async function fetchRounds() {
      const response = await axios
        .get(`/api/round/${id}`);

      const round = response.data.data;
      setGobies(round.gobies.map(transformNextPositionFn));
      setSeconds([...Array(round.timeLimit).keys()]);
    }

    fetchRounds()
  });

  return {gobies, seconds}
};
