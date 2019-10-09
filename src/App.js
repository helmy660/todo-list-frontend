import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Todo from './components/Todo/Todo';
import NavBar from './components/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';

const NoMatchPage = () => {
  return (
    <h3>404 - Page Not found</h3>
  )
}

export default () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/todo" component= {Todo} />
        <Route component= {NoMatchPage} />
      </Switch>
    </Router>
  );
};