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
  DOC_EXITO,
  DOC_ERROR,
} from "../types/index";
import tokenAuth from "../../config/token";
const AuthState = (props) => {
  const stateInicial = {
    user: null,
    authenticate: false,
    message: null,
    doc: null,
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
      dispatch({
        type: LOGIN_EXIT,
        payload: res.data.token,
      });
      getUser();
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
  const signupAction = async (data) => {
    try {
      const res = await clienteAxios.post("/api/auth/signup", data);
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

  const obtenerDoc = async () => {
    try {
      const res = await clienteAxios.get("/api/auth/doc");
      dispatch({
        type: DOC_EXITO,
        payload: res.data.doc[0].doc,
      });
    } catch (error) {
      dispatch({
        type: DOC_ERROR,
      });
    }
  };
  const cerrarSesion = async () => {
    try {
      const res = await clienteAxios.delete("/api/auth/");
      dispatch({
        type: CERRAR_SESION,
      });
    } catch (error) {
      dispatch({
        type: DOC_ERROR,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authenticate: state.authenticate,
        message: state.message,
        doc: state.doc,
        loginAction,
        signupAction,
        getUser,
        cerrarSesion,
        obtenerDoc,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
