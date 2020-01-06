import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Landing from "./containers/Landing";
import Demo from "./containers/Demo";
import Result from "./containers/Result";
import {UserProvider} from "./context/userContext";
import GameTimer from "./containers/GameTimer";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/demo" component={Demo}/>
        <Route exact path="/game" component={GameTimer}/>
        <Route exact path="/result" component={Result}/>
      </BrowserRouter>
    </UserProvider>
  )
};

export default App;
