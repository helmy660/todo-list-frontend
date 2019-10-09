import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';

const NoMatchPage = () => {
  return (
    <h3>404 - Page Not found</h3>
  )
}

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/home" component= {Home} />
        <Route component= {NoMatchPage} />
      </Switch>
    </Router>
  );
};