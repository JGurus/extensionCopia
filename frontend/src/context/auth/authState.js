import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import { SIGNUP_EXIT, LOGIN_EXIT, ERROR } from "../types/index";
const AuthState = (props) => {
  const stateInicial = {
    user: null,
    authenticate: false,
    message: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, stateInicial);
  const loginAction = async (data) => {
    try {
      const res = await clienteAxios.post("/api/auth/login", data);
      console.log(res.data);
      dispatch({
        type: LOGIN_EXIT,
        payload: res.data.token,
      });
    } catch (error) {
      console.log(error.response.data);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "error",
      };
      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };
  const signupAction = async (data) => {
    try {
      const res = await clienteAxios.post("/api/auth/signup", data);
      console.log(res.data);
      const alerta = {
        msg: res.data.msg,
        categoria: "exito",
      };
      dispatch({
        type: SIGNUP_EXIT,
        payload: alerta,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "error",
      };
      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authenticate: state.authenticate,
        message: state.message,
        loginAction,
        signupAction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
