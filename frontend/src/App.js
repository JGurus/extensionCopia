import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import RutaPrivada from "./components/Ruta/RutaPrivada";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import tokenAuth from "./config/token";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Home from "./components/Home";
import UserContext from "./context/auth/authContext";
const token = localStorage.getItem("token");
if (token) {
  console.log(token);
  tokenAuth(token);
}
function App() {
  const { getUser } = useContext(UserContext);
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
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
