import {
  OBTENER_USUARIO,
  OBTENER_USUARIO_ERROR,
  EDITAR_ACTIVE_ERROR,
  EDITAR_ACTIVE_EXITO,
  EDITAR_DOCUMENTO_EXITO,
  EDITAR_DOCUMENTO_ERROR,
} from "../types/index";

export default (state, action) => {
  switch (action.type) {
    case EDITAR_DOCUMENTO_EXITO:
      return { ...state };
    case EDITAR_ACTIVE_EXITO:
      const newList = state.list.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        } else {
          return user;
        }
      });
      return { ...state, list: newList };
    case OBTENER_USUARIO:
      return { ...state, list: action.payload };
    case OBTENER_USUARIO_ERROR:
    case EDITAR_DOCUMENTO_ERROR:
      return { ...state };
    default:
      return state;
  }
};
