import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useUser} from "../../context/userContext";
import styles from './Result.module.scss';
import cx from 'classnames';


const Result = () => {
  const [results, setResults] = useState(null);
  const [user] = useUser();

  useEffect(() => {
    async function fetchResults() {
      const response = await axios
        .get('http://localhost:8000/api/results');

      setResults(response.data.data);
    }

    fetchResults()
      .catch(e => console.error(e));
  }, []);

  return (
    <div className={styles.Results}>
      <div className={styles.Grid}>

        <div className={styles.Header}>User</div>
        <div className={styles.Header}>Round</div>
        <div className={styles.Header}>Time (ms)</div>
        {results
          ? results.map((result, index) => {
            const isUserResult = user.uuid === result.uuid;
            return (
              <React.Fragment key={index}>
                <div className={cx(styles.Cell, {[styles.UserCell]: isUserResult})}>
                  {isUserResult ? 'You' : result.uuid}
                </div>
                <div className={cx(styles.Cell, {[styles.UserCell]: isUserResult})}>
                  {result.round}
                </div>
                <div className={cx(styles.Cell, {[styles.UserCell]: isUserResult})}>
                  {result.time.toFixed(2)}
                </div>
              </React.Fragment>
            )
          })
          : <div className={styles.NoResults}>
            No results at this time
          </div>
        }
      </div>
    </div>
  )
};

export default Result;
