import {useEffect, useState} from "react";
import axios from "axios";


interface Results {
  uuid: string;
  round: number;
  fishOneTime: number | null;
  fishTwoTime: number | null;
}

export const useFetchResults = (): Results[] | null => {
  const [results, setResults] = useState<Results[] | null>(null);

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
