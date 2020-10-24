import {
  LOGIN_EXIT,
  SIGNUP_EXIT,
  ERROR,
  OBTENER_USUARIO,
  OBTENER_USUARIO_ERROR,
  CERRAR_SESION,
} from "../types/index";
export default (state, action) => {
  switch (action.type) {
    case SIGNUP_EXIT:
      return { ...state, message: action.payload };
    case OBTENER_USUARIO:
      return { ...state, user: action.payload, authenticate: true };
    case LOGIN_EXIT:
      localStorage.setItem("token", action.payload);
      return { ...state, authenticate: true };
    case OBTENER_USUARIO_ERROR:
      return { ...state };
    case ERROR:
      return { ...state, message: action.payload };
    case CERRAR_SESION:
      localStorage.removeItem("token");
      return { ...state, user: null, authenticate: false };
    default:
      return state;
  }
};
