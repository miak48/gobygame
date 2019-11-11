import React from 'react';
import background from '../../assets/images/gravel2.png';
import styles from './Demo.module.scss';

function Demo() {
  return (
    <div className={styles.Demo}>
      <img src={background} alt=" " className={styles.backgroundGravel} />
      <h1>How To Play</h1>
      <h4>a description of the game to go here</h4>
    </div>
  );
}

export default Demo;
