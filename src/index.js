import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import { HashRouter, Route, Switch } from "react-router-dom";

import indexRoutes from "./routes/index.jsx";

import reducers from './reducers';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

//import './App.css'
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <HashRouter>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route to={prop.path} component={prop.component} key={key} />;
      })}
      
    </Switch>
  </HashRouter>
  </Provider>,
  document.getElementById("root")
);
