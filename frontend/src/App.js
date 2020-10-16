import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import tokenAuht from "./config/token";
import Home from "./components/Home";
const token = localStorage.getItem("token");
if (token) {
  tokenAuht(token);
}
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/messages" component={Chat} exact />
      </Switch>
    </Router>
  );
}

export default App;
