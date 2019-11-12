import React from 'react';
import { Link } from "react-router-dom";
import styles from './Landing.module.scss';

const Landing = () => {
  return (
    <div className={styles.Background}>
      <div className={styles.Title}>
        <h1>Goby Game</h1>
        <h4>An awesome description of how to play this fun game!</h4>
      </div>
      <Link to="/Demo">
        <button className={styles.CustomButton}>
          View Demo
        </button>
      </Link>
    </div>
  );
};

export default Landing;
