import React from 'react';
import styles from './Demo.module.scss';
import gobyFigure from '../../assets/realgoby.png';
import gobyFigure2 from '../../assets/realgoby2.png';
import {Border} from "../../components/Border/Border";
import {LinkButton} from "../../components/LinkButton/LinkButton";
import {GiveUpButton} from "../../components/GiveUpButton/GiveUpButton";
import {CountdownTimer} from "../../components/CountdownTimer/CountdownTimer";

export const Demo = () => {
  return (
    <Border>
      <GiveUpButton/>
      <CountdownTimer auto total={10}/>
      <div className={styles.Background}>
        <img src={gobyFigure} alt="" className={styles.GobyImage}/>
        <img src={gobyFigure2} alt="" className={styles.GobyImage2}/>
        <div className={styles.Rectangle}/>
        <div className={styles.TimerCircle}/>
        <div className={styles.Instructions}>
          <h1> First, some rules! </h1>
          <h4> * Click on as many gobies as you can before the time runs out. They might be moving around! </h4>
          <h4> * You can give up at any point by pressing the 'give up' button </h4>
          <h4> * There are only 13 rounds - we'd love if you could play them all! </h4>


          <LinkButton to="/Game" className={styles.DemoButton}>
            Play
          </LinkButton>
        </div>
      </div>
    </Border>
  );
};
