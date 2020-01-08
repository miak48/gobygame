import React from 'react';
import styles from './Border.module.scss';

export const Border = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={styles.Border}/>
);
