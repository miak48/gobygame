import React from 'react';
import background from '../../assets/images/gravel2.png';
import '../../assets/css/main.css';

function Game() {
  return (
    <div className="Game">
        <img src={background} className="background-gravel" />
        <div className="square"/>
    </div>
  );
}

export default Game;
