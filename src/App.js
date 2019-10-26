import React from 'react';
import background from './assets/gravel.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="App-logo" alt="logo" />
        <div className="square"></div>
      </header>
    </div>
  );
}

export default App;
