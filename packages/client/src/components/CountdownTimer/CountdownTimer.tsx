import React from 'react';
import styles from './CountdownTimer.module.scss';


interface CountdownTimerProps {
  total: number;
  seconds?: number;
  auto?: boolean;
}

export const CountdownTimer = ({total, seconds = 0, auto = false}: CountdownTimerProps) => {
  const css = auto
    ? {animationDuration: `${total}s`}
    : {strokeDashoffset: seconds / total * 220, animation: 'none'};

  return (
    <div className={styles.Countdown}>
      <svg>
        <circle r="35" cx="40" cy="40" style={css}/>
      </svg>
    </div>
  );
};
