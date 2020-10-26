import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "normalize.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import AdminState from "./context/admin/adminState";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AdminState>
        <AlertState>
          <App />
        </AlertState>
      </AdminState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
