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
          <div className={cx(styles.Header, styles.Number)}>Fish One (s)</div>
          <div className={cx(styles.Header, styles.Number)}>Fish Two (s)</div>
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
                    {result.fishOneTime?.toFixed(2) ?? 'Not Caught'}
                  </div>
                  <div className={cx(styles.Cell, styles.Number, {[styles.UserCell]: isUserResult})}>
                    {result.fishTwoTime?.toFixed(2) ?? 'Not Caught'}
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
