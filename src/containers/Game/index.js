import React from 'react';
import background from '../../assets/images/gravel2.png';
import styles from './Game.module.scss';

function Game() {
  return (
    <div className={styles.Game}>
        <img src={background} className={styles.backgroundGravel} />
        <div className={styles.square} />
    </div>
  );
}

export default Game;
