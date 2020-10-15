import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import { SIGNUP_EXIT, LOGIN_EXIT, ERROR } from "../types/index";
const authState = (props) => {
  const initialState = {
    user: null,
    authenticate: false,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const loginAction = async () => {
    try {
      console.log("iniciando sesion");
    } catch (error) {
      console.log(error);
    }
  };
  const signupAction = async (data) => {
    try {
      const res = await clienteAxios.post("/api/signup", data);
      console.log(res.data);
      dispatch({
        type: SIGNUP_EXIT,
        payload: res.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <authContext.Provider
      value={{
        user: state.user,
        authenticate: state.authenticate,
        loginAction,
        signupAction,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default authState;
