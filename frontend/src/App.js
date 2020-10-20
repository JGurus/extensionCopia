import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import tokenAuth from "./config/token";
import Home from "./components/Home";
import RutaPrivada from "./components/Ruta/RutaPrivada";
const token = localStorage.getItem("token");
if (token) {
  console.log(token);
  tokenAuth(token);
}
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <RutaPrivada path="/messages" component={Chat} exact />
      </Switch>
    </Router>
  );
}

export default App;
