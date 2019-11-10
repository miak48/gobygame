import React from 'react';
import { Link } from "react-router-dom";
import goby_home from '../../assets/images/goby_home.png';
import styles from './Landing.module.scss';

function Landing() {
  return (
    <div class="overallstyle">
      <img src={goby_home} alt=" " className={styles.backgroundgoby} />
      <h1>Goby Game</h1>
      <h4>a description of the game to go here</h4>
      <Link to="/DemoPage"><button className={styles.button}>Start Game</button></Link>     
    </div>
  );
}

export default Landing;
