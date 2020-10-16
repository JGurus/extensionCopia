import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AlertState>
        <App />
      </AlertState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
