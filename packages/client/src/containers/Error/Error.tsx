import React from 'react';
import styles from './Error.module.scss';
import {WindowSize} from "../../hooks/useWindowSize";


interface ErrorProps {
  windowSize: WindowSize;
}

export const Error = ({windowSize}: ErrorProps) => {
  return (
    <div className={styles.Error}>
      <div>
        Current screen dimensions: {windowSize.width}px / {windowSize.height}px
      </div>
      <div>
        Your screen size is too small to play the game.
      </div>
    </div>
  )
};
