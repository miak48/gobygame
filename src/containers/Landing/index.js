import React from 'react';
import { Link } from "react-router-dom";
import goby_home from '../../assets/images/goby_home.png';
import styles from './Landing.module.scss';

function Landing() {
  return (
    <div class="overallstyle">
      <img src={goby_home} alt=" " className={styles.backgroundgoby} />
      <h1>Goby Game</h1>
      <h4>a description of how to play the game </h4>
      <Link to="/Demo"><button className={styles.button}>View Demo</button></Link>     
    </div>
  );
}

export default Landing;
