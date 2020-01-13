import React, {HTMLAttributes} from 'react';
import styles from './StartButton.module.scss';

export const StartButton = ({display, ...buttonProps}: HTMLAttributes<HTMLButtonElement> & {display: boolean, disabled: boolean}) => {
  return display
    ? <button {...buttonProps} className={styles.Button}>Start</button>
    : null;
};
