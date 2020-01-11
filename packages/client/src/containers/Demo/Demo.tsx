import React from 'react';
import {Link} from "react-router-dom";
import styles from './Demo.module.scss';
import gobyFigure from '../../assets/realgoby.png';
import gobyFigure2 from '../../assets/realgoby2.png';
import {Border} from "../../components/Border/Border";

export const Demo = () => {
  return (
    <Border>
      <div className={styles.Background}>
        <img src={gobyFigure} alt="" className={styles.GobyImage}/>
        <img src={gobyFigure2} alt="" className={styles.GobyImage2}/>
        <div className={styles.Rectangle}/>
        <div className={styles.TimerCircle}/>
        <div className={styles.Instructions}>
          <h1> First, some rules! </h1>
          <h4> * Click on as many gobies as you can before the time runs out </h4>
          <h4> * They might be moving around! </h4>
          <h4> * You can give up at any point by pressing the 'give up' button </h4>
        </div>
        <Link to="/Game">
          <button className={styles.DemoButton}>
            Play
          </button>
        </Link>
        <Link to="/Game">
          <button className={styles.GiveUpButton}>
            Give Up
          </button>
        </Link>
      </div>
    </Border>
  );
};
