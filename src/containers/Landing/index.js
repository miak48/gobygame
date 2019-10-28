import React from 'react';
import { Link } from "react-router-dom";

import background from '../../assets/images/gravel2.png';
import styles from './Landing.module.scss';

function Landing() {
  return (
    <div className={styles.Landing}>
      <h1>Hello, Mia! We ❤️  you</h1>
      <h3>This page is intentionally ugly, we need you to clean it up!</h3>
      <h6>I know you are up to the task</h6>
      <Link to='/game'>Link to the Game page</Link>
    </div>
  );
}

export default Landing;
