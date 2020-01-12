import React, {HTMLAttributes} from 'react';
import styles from './LinkButton.module.scss';
import cx from 'classnames';
import {Link} from "react-router-dom";


export type LinkButtonProps = HTMLAttributes<HTMLButtonElement> & {
  to: string;
}

export const LinkButton = ({to, ...buttonProps}: LinkButtonProps) => {
  return (
    <Link to={to}>
      <button {...buttonProps} className={cx(styles.Button, buttonProps.className)}/>
    </Link>
  );
};
