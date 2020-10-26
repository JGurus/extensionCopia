import {
  LOGIN_EXIT,
  SIGNUP_EXIT,
  ERROR,
  OBTENER_USUARIO,
  OBTENER_USUARIO_ERROR,
  CERRAR_SESION,
  DOC_ERROR,
  DOC_EXITO,
} from "../types/index";
export default (state, action) => {
  switch (action.type) {
    case SIGNUP_EXIT:
      return { ...state, message: action.payload };
    case DOC_EXITO:
      return { ...state, doc: action.payload };
    case OBTENER_USUARIO:
      return {
        ...state,
        user: action.payload,
        authenticate: true,
        message: null,
      };
    case LOGIN_EXIT:
      localStorage.setItem("token", action.payload);
      return { ...state, authenticate: true, message: null };
    case DOC_ERROR:
    case OBTENER_USUARIO_ERROR:
      return { ...state };
    case ERROR:
      return { ...state, message: action.payload };
    case CERRAR_SESION:
      localStorage.removeItem("token");
      return { ...state, user: null, authenticate: false, message: null };
    default:
      return state;
  }
};
