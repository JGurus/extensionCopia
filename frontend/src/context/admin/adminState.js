import React, { useReducer } from "react";
import AdminContext from "./adminContext";
import AdminReducer from "./adminReducer";
import clienteAxios from "../../config/axios";
import {
  OBTENER_USUARIO,
  OBTENER_USUARIO_ERROR,
  EDITAR_ACTIVE_ERROR,
  EDITAR_ACTIVE_EXITO,
  EDITAR_DOCUMENTO_EXITO,
  EDITAR_DOCUMENTO_ERROR,
} from "../types/index";
const AdminState = (props) => {
  const initialState = {
    message: null,
    list: null,
  };
  const [state, dispatch] = useReducer(AdminReducer, initialState);
  const obtenerUsuarios = async () => {
    try {
      const res = await clienteAxios.get("/api/admin/");
      console.log(res.data);
      dispatch({
        type: OBTENER_USUARIO,
        payload: res.data.listUser,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: OBTENER_USUARIO_ERROR,
      });
    }
  };

  const activeUser = async (data) => {
    try {
      const res = await clienteAxios.post("/api/admin/active", data);
      console.log(res.data);
      dispatch({
        type: EDITAR_ACTIVE_EXITO,
        payload: res.data.userDB,
      });
    } catch (error) {
      dispatch({
        type: EDITAR_ACTIVE_ERROR,
      });
    }
  };

  const editarDocumento = async (data) => {
    try {
      const res = await clienteAxios.post("/api/admin/doc", data);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        message: state.message,
        list: state.list,
        obtenerUsuarios,
        activeUser,
        editarDocumento,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
