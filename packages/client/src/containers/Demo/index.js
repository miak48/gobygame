import React from 'react';
import {Link} from "react-router-dom";
import styles from './Demo.module.scss';
import goby_fig from './assets/realgoby.png';
import goby_fig2 from './assets/realgoby2.png';
import Border from "../../components/Border/Border";

function Demo() {
  return (
    <Border>
      <div className={styles.Background}>
        <img src={goby_fig} alt=" " className={styles.gobyimage}/>
        <img src={goby_fig2} alt=" " className={styles.gobyimage2}/>
        <div className={styles.Rectangle}/>
        <div className={styles.TimerCircle}/>
        <div className={styles.Instructions}>
          <h1> First, some rules! </h1>
          <h4> * Click on as many gobies as you can before the time runs out </h4>
          <h4> * You can give up at any point by pressing the 'give up' button </h4>
          <h4> * There may be a different number of gobies in each round! </h4>
        </div>
        <Link to="/Game">
          <button className={styles.DemoButton}>
            Play
          </button>
        </Link>
        <Link to="/Game">
          <button className={styles.GiveupButton}>
            Give Up
          </button>
        </Link>
      </div>
    </Border>
  );
}

export default Demo;
