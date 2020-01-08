import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useUser} from "../../context/userContext";
import styles from './Results.module.scss';
import cx from 'classnames';
import {Border} from "../../components/Border/Border";


interface Result {
  uuid: string;
  round: number;
  fishOneTime: number;
  fishTwoTime: number;
}

export const Result = () => {
  const [results, setResults] = useState<Result[] | null>(null);
  const [user] = useUser();

  useEffect(() => {
    async function fetchResults() {
      const response = await axios
        .get('/api/results');

      setResults(response.data.data);
    }

    fetchResults()
      .catch(e => console.error(e));
  }, []);

  return (
    <Border>
      <div className={styles.Scrollable}>
        <div className={styles.Grid}>

          <div className={styles.Header}>User</div>
          <div className={cx(styles.Header, styles.Number)}>Round</div>
          <div className={cx(styles.Header, styles.Number)}>Fish One (ms)</div>
          <div className={cx(styles.Header, styles.Number)}>Fish Two (ms)</div>
          {results
            ? results.map((result, index) => {
              const isUserResult = user.uuid === result.uuid;
              return (
                <React.Fragment key={index}>
                  <div className={cx(styles.Cell, {[styles.UserCell]: isUserResult})}>
                    {isUserResult ? 'You' : result.uuid}
                  </div>
                  <div className={cx(styles.Cell, styles.Number, {[styles.UserCell]: isUserResult})}>
                    {result.round}
                  </div>
                  <div className={cx(styles.Cell, styles.Number, {[styles.UserCell]: isUserResult})}>
                    {result.fishOneTime.toFixed(2)}
                  </div>
                  <div className={cx(styles.Cell, styles.Number, {[styles.UserCell]: isUserResult})}>
                    {result.fishTwoTime.toFixed(2)}
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
    </Border>
  )
};
