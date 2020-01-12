import React from 'react';
import styles from './GiveUpButton.module.scss';
import cx from 'classnames';
import {LinkButtonProps} from "../LinkButton/LinkButton";
import {Link} from "react-router-dom";


export const GiveUpButton = ({to, ...buttonProps}: LinkButtonProps) => {
  return (
    <Link to={to}>
      <button {...buttonProps} className={cx(styles.GiveUpButton, buttonProps.className)}>
        Give Up
      </button>
    </Link>
  );
};
