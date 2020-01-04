import React, {useEffect, useState} from 'react';
import axios from 'axios';


const Result = () => {
  const [results, setResults] = useState(() => []);

  useEffect(() => {
    async function fetchResults() {
        const response = await axios.get('http://localhost:8000/api/results');

      setResults(response.data.data);
    }

    fetchResults()
      .catch(e => console.error(e));
  }, []);

  console.log('Result', results)

  return (
    <div>
      Result Page:
      {results.map((result, index) => (
        <div key={index}>
          <span>{result.user}</span>
          <span>{result.round}</span>
          <span>{result.time}</span>
        </div>
      ))}
    </div>
  )
};

export default Result;
