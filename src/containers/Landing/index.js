import React from 'react';
import { Link } from "react-router-dom";
import styles from './Landing.module.scss';

const Landing = () => {
  return (
    <div className={styles.Background}>
      <div className={styles.Title}>
        <h1>Goby Game</h1>
        <h4> This fish is a Goby. They use camouflage to blend into their background! 
          While this background-blending is great when it comes to avoiding detection by deadly predators, 
          it's not so great when it comes to finding food or mates. Our lab at the  
          <a href='https://sydney.edu.au/science/our-research/research-areas/life-and-environmental-sciences/animal-behaviour-lab.html'> University of Sydney</a> is currently trying to understand how these fish balance the need to move against 
          the need to stay still. If you want to help us, try our game! You'll play the part of the 
          predator searching for a yummy goby meal. </h4>
      </div>
      <Link to="/Demo">
        <button className={styles.CustomButton}>
          Play
        </button>
      </Link>
    </div>
  );
};

export default Landing;
