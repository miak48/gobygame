import React from 'react';
import { Link } from "react-router-dom";
import goby_home from '../../assets/images/goby_home.png';
import background from '../../assets/images/gravel2.png';
import styles from './Landing.module.scss';

function Landing() {
  return (
    <div class="backgroundgoby">
      <img src={goby_home} alt="" />
      <h1>Goby Game </h1>
      <h4>a description of the game to go here</h4>
      <Link to='/game'>Start Game</Link>
    </div>
  );
}

export default Landing;
