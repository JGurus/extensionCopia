import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
const RutaPrivada = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { authenticate } = authContext;
  return (
    <Route
      {...props}
      render={(props) =>
        authenticate !== true ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
