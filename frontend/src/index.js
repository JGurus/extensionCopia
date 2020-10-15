import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AuthState from "./context/auth/authState";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <App />
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
