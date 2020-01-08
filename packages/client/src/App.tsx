import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Landing} from "./containers/Landing/Landing";
import {Demo} from "./containers/Demo/Demo";
import {Result} from "./containers/Results/Result";
import {UserProvider} from "./context/userContext";
import {GameTimer} from "./containers/GameTimer/GameTimer";

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/demo" component={Demo}/>
        <Route exact path="/game" component={GameTimer}/>
        <Route exact path="/results" component={Result}/>
      </BrowserRouter>
    </UserProvider>
  )
};
