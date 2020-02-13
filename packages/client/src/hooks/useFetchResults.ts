import {useEffect, useState} from "react";
import axios from "axios";
import {RoundResult} from "@gobygame/models";


export const useFetchResults = (): RoundResult[] | null => {
  const [results, setResults] = useState<RoundResult[] | null>(null);

  useEffect(() => {
    async function fetchResults() {
      const response = await axios
        .get('/api/results');

      setResults(response.data.data);
    }

    fetchResults()
      .catch(e => console.error(e));
  }, []);

  return results;
};
