import React, {HTMLAttributes} from 'react';
import styles from './StartButton.module.scss';
import {CircleButton} from "../CircleButton/CircleButton";

export const StartButton = (buttonProps: HTMLAttributes<HTMLButtonElement>) => {
  return <CircleButton {...buttonProps} className={styles.StartButton}>Start</CircleButton>;
};
