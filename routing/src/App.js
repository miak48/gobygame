import React from 'react';
import background from './assets/gravel2.png';
import goby_home from './assets/goby_home.png';
import './App.css';


class home extends React.Component {
  render() {
    return (
      <div className="HomePage">
      <img src={goby_home} className="goby_home" alt="goby" />
   </div>
    )
  }
}

class App extends React.Component {
  render() {
      return (
       <div className="Welcome">
          <img src={background} className="background-gravel" alt="gravel" />
          <div className="square" alt="square"/>
       </div>
      )
    } 
  
}

export default home;