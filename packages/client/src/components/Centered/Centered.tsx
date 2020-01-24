import React from 'react';
import styles from './Centered.module.scss';


interface CenteredProps extends React.HTMLAttributes<HTMLDivElement> {
  height: number | string;
  width: number | string;
}

export const Centered = ({height, width, ...props}: CenteredProps) => (
  <div
    {...props}
    className={styles.Centered}
    style={{
      height,
      width
    }}
  />
);
