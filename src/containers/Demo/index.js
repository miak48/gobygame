import React from 'react';
import { Link } from "react-router-dom";
import styles from './Demo.module.scss';
import goby_fig from './assets/goby.png';
import goby_fig2 from './assets/goby.png';


function Demo() {
  return (
    <div className={styles.demobackground}>
      <img src={goby_fig} alt=" " className={styles.gobyimage}/>
      <img src={goby_fig2} alt=" " className={styles.gobyimage2}/>
        <div className={styles.Instructions}>
          <h1> How to play </h1>
          <h4> * Click on as many gobies as you can before the time runs out </h4>
          <h4> * Rounds end when you've found all the gobies, when the time runs out or if you decide to give up </h4>
          <h4> * There may be a different number of gobies in each round! </h4>
        </div>
        <Link to="/Game">
          <button className={styles.DemoButton}>
            Play
          </button>
        </Link>
    </div>
  );
}

export default Demo;
