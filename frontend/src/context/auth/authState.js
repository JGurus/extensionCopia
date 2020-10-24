import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import {
  SIGNUP_EXIT,
  LOGIN_EXIT,
  ERROR,
  OBTENER_USUARIO,
  CERRAR_SESION,
} from "../types/index";
import tokenAuth from "../../config/token";
const AuthState = (props) => {
  const stateInicial = {
    user: null,
    authenticate: false,
    message: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, stateInicial);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const res = await clienteAxios.get("/api/auth/user");
      dispatch({
        type: OBTENER_USUARIO,
        payload: res.data.usuario,
      });
    } catch (error) {
      dispatch({
        type: CERRAR_SESION,
      });
    }
  };
  const loginAction = async (data) => {
    try {
      const res = await clienteAxios.post("/api/auth/login", data);
      console.log(res.data);
      dispatch({
        type: LOGIN_EXIT,
        payload: res.data.token,
      });
      getUser();
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
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authenticate: state.authenticate,
        message: state.message,
        loginAction,
        signupAction,
        getUser,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
