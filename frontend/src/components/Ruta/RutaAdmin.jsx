import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
const RutaAdmin = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { authenticate, user } = authContext;
  return (
    <Route
      {...props}
      render={(props) =>
        authenticate !== true && user?.admin !== true ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaAdmin;
