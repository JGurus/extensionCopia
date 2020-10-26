import React, { useState, useContext, useEffect } from "react";
import AdminContext from "../context/admin/adminContext";
import UserContext from "../context/auth/authContext";
import AlertContext from "../context/alert/alertContext";
import Alerta from "./Alerta";
import "./Documento.css";
const Documento = () => {
  const { editarDocumento } = useContext(AdminContext);
  const { alerta, mostrarAlerta } = useContext(AlertContext);
  const { user, doc, obtenerDoc } = useContext(UserContext);
  const [editar, setEditar] = useState(false);
  const [texto, setTexto] = useState("");
  useEffect(() => {
    obtenerDoc();
  }, []);
  return (
    <div className="text-content">
      {alerta !== null ? (
        <Alerta msg={alerta.msg} categoria={alerta.categoria} />
      ) : null}

      {user.admin === true ? (
        <button
          onClick={() => {
            setEditar(true);
          }}
        >
          Editar
        </button>
      ) : null}
      <p>{doc ? doc : "Hola amikos"}</p>
      {editar && user.admin === true ? (
        <>
          <textarea
            value={texto}
            name="doc"
            cols="10"
            rows="10"
            placeholder="Escribe algo"
            onChange={(e) => {
              setTexto(e.target.value);
            }}
          ></textarea>
          <div>
            <button
              onClick={() => {
                setEditar(false);
                setTexto("");
              }}
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (!texto.trim()) {
                  mostrarAlerta("Escribe algo cojones", "error");
                  return;
                }
                editarDocumento({ doc: texto });
                setEditar(false);
                setTexto("");
              }}
            >
              Guardar
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Documento;
