import React, {HTMLAttributes} from 'react';
import styles from './CircleButton.module.scss';
import cx from 'classnames';


type CircleButton = HTMLAttributes<HTMLButtonElement>;

export const CircleButton = ({...buttonProps}: CircleButton) => {
  return (
      <button {...buttonProps} className={cx(styles.CircleButton, buttonProps.className)}/>
  );
};
