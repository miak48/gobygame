import React from 'react';
import background from '../../assets/images/gravel2_iphone.jpg';
import styles from './Game.module.scss';
import goby_fig from './assets/realgoby.png';
import goby_fig2 from './assets/realgoby2.png';


function Game() {
  return (
    <div className={styles.Game}>
        <img src={goby_fig} alt=" " className={styles.gobyimage}/>
        <img src={goby_fig2} alt=" " className={styles.gobyimage2}/>
        <img src={background} alt=" " className={styles.backgroundGravel} />
        <div className={styles.square} />
    </div>
  );
}

export default Game;
