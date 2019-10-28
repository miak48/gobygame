import React from 'react';
import { Link } from "react-router-dom";

import background from '../../assets/images/gravel2.png';
import '../../assets/css/main.css';

function Landing() {
  return (
    <div className="Landing">
      <h1>Hello, Mia! We ❤️  you. Feel free start designing this page</h1>
      <Link to='/game'>Link to the Game page</Link>
    </div>
  );
}

export default Landing;
