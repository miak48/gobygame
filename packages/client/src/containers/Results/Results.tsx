import React from 'react';
import {useUser} from "../../hooks/userContext";
import styles from './Results.module.scss';
import cx from 'classnames';
import {Border} from "../../components/Border/Border";
import {useFetchResults} from "../../hooks/useFetchResults";


export const Result = () => {
  const [user] = useUser();
  const results = useFetchResults();

  return (
    <Border>
      <div className={styles.Scrollable}>
        <div className={styles.Grid}>

          <div className={styles.Header}>User</div>
          <div className={cx(styles.Header, styles.Number)}>Round</div>
          <div className={cx(styles.Header, styles.Number)}>Attempt</div>
          <div className={cx(styles.Header, styles.Number)}>Total Time (s)</div>
          {results
            ? results.map((result, index) => {
              const isUserResult = user.uuid === result.uuid;
              return (
                <React.Fragment key={index}>
                  <div className={cx(styles.Cell, {[styles.UserCell]: isUserResult})}>
                    {isUserResult ? 'You' : result.uuid}
                  </div>
                  <div className={cx(styles.Cell, styles.Number, {[styles.UserCell]: isUserResult})}>
                    {result.roundId}
                  </div>
                  <div className={cx(styles.Cell, styles.Number, {[styles.UserCell]: isUserResult})}>
                    {result.attempt}
                  </div>
                  <div className={cx(styles.Cell, styles.Number, {[styles.UserCell]: isUserResult})}>
                    {result.foundAll ? (result.totalTime / 1000).toFixed(2) : 'FAILED'}
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
