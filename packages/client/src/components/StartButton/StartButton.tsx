import React, {HTMLAttributes} from 'react';
import styles from './StartButton.module.scss';
import {CircleButton} from "../CircleButton/CircleButton";

export const StartButton = ({display, ...buttonProps}: HTMLAttributes<HTMLButtonElement> & {display: boolean, disabled: boolean}) => {
  return display
    ? <CircleButton {...buttonProps} className={styles.StartButton}>Start</CircleButton>
    : null;
};
