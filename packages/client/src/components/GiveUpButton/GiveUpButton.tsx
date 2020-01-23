import React, {HTMLAttributes} from 'react';
import styles from './GiveUpButton.module.scss';
import {CircleButton} from "../CircleButton/CircleButton";


export const GiveUpButton = (buttonProps: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <CircleButton {...buttonProps} className={styles.GiveUpButton}>
      Give Up
    </CircleButton>
  );
};
