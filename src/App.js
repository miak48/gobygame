import React from 'react';
import background from './assets/gravel2.png';
import './App.css';

function App() {
  return (
    <div className="App">
        <img src={background} className="background-gravel" />
        <div className="square"/>
    </div>
  );
}

export default App;
