import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Landing from "./containers/Landing";
import Demo from "./containers/Demo";
import Game from "./containers/Game";
import Result from "./containers/Result";
import UserContext, {user} from "./context/userContext";

const App = () => {
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/demo" component={Demo}/>
        <Route exact path="/game" component={Game}/>
        <Route exact path="/result" component={Result}/>
      </BrowserRouter>
    </UserContext.Provider>
  )
};

export default App;
