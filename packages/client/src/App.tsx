import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Landing} from "./containers/Landing/Landing";
import {Demo} from "./containers/Demo/Demo";
import {Result} from "./containers/Results/Result";
import {UserProvider} from "./context/userContext";
import {Error} from "./containers/Error/Error";
import {useWindowSize} from "./utilities/useWindowSize";
import {GamePlotter} from "./containers/GobyPlotter/GamePlotter";
import {Game} from "./containers/Game/Game";

export const App = () => {
  const windowSize = useWindowSize();

  return windowSize.height < 710 || windowSize.width < 1010
    ? <Error windowSize={windowSize}/>
    : (
      <UserProvider>
        <BrowserRouter>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/demo" component={Demo}/>
          <Route exact path="/game" component={Game}/>
          <Route exact path="/results" component={Result}/>
          <Route exact path="/plot" component={GamePlotter}/>
        </BrowserRouter>
      </UserProvider>
    )
};
