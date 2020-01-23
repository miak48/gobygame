import React from 'react';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {Landing} from "./containers/Landing/Landing";
import {Practice} from "./containers/Practice/Practice";
import {Result} from "./containers/Results/Results";
import {UserProvider} from "./hooks/userContext";
import {Error} from "./containers/Error/Error";
import {useWindowSize} from "./hooks/useWindowSize";
import {GamePlotter} from "./containers/GobyPlotter/GamePlotter";
import {Game, RandomRound} from "./containers/Game/Game";
import {GameRoundProvider} from "./hooks/gameRoundContext";
import {Exporter} from "./containers/Exporter/Exporter";
import {Rules} from "./containers/Rules/Rules";

export const App = () => {
  const windowSize = useWindowSize();

  return windowSize.height < 710 || windowSize.width < 1010
    ? <Error windowSize={windowSize}/>
    : (
      <UserProvider>
        <GameRoundProvider>
          <BrowserRouter>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/rules" component={Rules}/>
            <Route exact path="/practice" component={Practice}/>
            <Route exact path="/game" component={RandomRound}/>
            <Route exact path="/game/:round" component={Game}/>
            <Route exact path="/results" component={Result}/>
            <Route exact path="/plots" component={() => <Redirect to={'/plot/1'}/>}/>
            <Route exact path="/plot" component={() => <Redirect to={'/plot/1'}/>}/>
            <Route exact path="/plot/:round" component={GamePlotter}/>
            <Route exact path="/export" component={Exporter}/>
          </BrowserRouter>
        </GameRoundProvider>
      </UserProvider>
    )
};
