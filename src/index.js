import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/index.css';
import Landing from './containers/Landing';
import Game from './containers/Game';
import Demo from './containers/Demo';
import * as serviceWorker from './serviceWorker';
import Result from "./containers/Result";

ReactDOM.render(
  <Router>
    <Route exact path="/" component={Landing} />
    <Route exact path="/demo" component={Demo} />
    <Route exact path="/game" component={Game} />
    <Route exact path="/result" component={Result} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
