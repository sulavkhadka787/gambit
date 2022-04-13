import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login/login";
import Register from "./registration/register";
import Home from "./home/home";
import BlackJack from "./blackjack/BlackJack";

const NavRouter = (props) => {
  return (
    <div className="navSwitch">
      <Router>
        <Switch>
          <Route path="/login">
            <Login onLogin={props.onLogin} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/blackjack">
            <BlackJack />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default NavRouter;
