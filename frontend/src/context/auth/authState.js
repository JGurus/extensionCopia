import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import { SIGNUP_EXIT, LOGIN_EXIT, ERROR } from "../types/index";
const AuthState = (props) => {
  const stateInicial = {
    user: null,
    authenticate: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, stateInicial);
  const loginAction = async () => {
    try {
      console.log("iniciando sesion");
    } catch (error) {
      console.log(error);
    }
  };
  const signupAction = async (data) => {
    try {
      const res = await clienteAxios.post("/api/auth/signup", data);
      console.log(res.data);
      dispatch({
        type: SIGNUP_EXIT,
        payload: res.data.msg,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authenticate: state.authenticate,
        loginAction,
        signupAction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
