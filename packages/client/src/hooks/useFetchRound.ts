import {useState} from "react";
import axios from "axios";
import {GameRound} from "@gobygame/models";


export const useFetchRound = (id: string): GameRound | null => {
  const [gameRound, setGameRound] = useState<GameRound | null>(null);

  useState(() => {
    async function fetchRounds() {
      const response = await axios
        .get(`/api/round/${id}`);

      setGameRound(response.data.data as GameRound);
    }

    fetchRounds()
  });

  return gameRound;
};
