import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types/index";
const AlertState = (props) => {
  const initialState = {
    alerta: null,
  };
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria,
      },
    });

    // Después de 2 segundos limpiar la alerta
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 2000);
  };
  return (
    <AlertContext.Provider value={{ alerta: state.alerta, mostrarAlerta }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
