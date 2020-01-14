import React from 'react';
import styles from './GiveUpButton.module.scss';
import {LinkButtonProps} from "../LinkButton/LinkButton";
import {Link} from "react-router-dom";
import {CircleButton} from "../CircleButton/CircleButton";


export const GiveUpButton = ({to, ...buttonProps}: LinkButtonProps) => {
  return (
    <Link to={to}>
      <CircleButton {...buttonProps} className={styles.GiveUpButton}>
        Give Up
      </CircleButton>
    </Link>
  );
};
