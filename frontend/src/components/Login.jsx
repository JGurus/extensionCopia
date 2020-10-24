import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import AlertContext from "../context/alert/alertContext";
import AuthContext from "../context/auth/authContext";
import Alerta from "../components/Alerta";
function Login(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { user, message, loginAction } = authContext;
  const { alerta, mostrarAlerta } = alertContext;
  const [data, setData] = useState({
    usuario: "",
    contrasenia: "",
  });
  useEffect(() => {
    if (user) {
      props.history.push("/messages");
    }
    if (message) {
      mostrarAlerta(message.msg, message.categoria);
    }
  }, [message, user]);
  const login = (e) => {
    e.preventDefault();
    if (!data.usuario.trim()) {
      mostrarAlerta("El usuario es requerido", "error");
      return;
    }
    if (!data.contrasenia.trim()) {
      mostrarAlerta("La contraseña es requerida", "error");
      return;
    }
    loginAction(data);
  };
  return (
    <>
      {alerta !== null ? (
        <Alerta msg={alerta.msg} categoria={alerta.categoria} />
      ) : null}
      <form
        className="login"
        onSubmit={(e) => {
          login(e);
        }}
      >
        <input
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
          type="text"
          name="usuario"
          placeholder="Nombre de Usuario"
        />
        <input
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
          type="password"
          name="contrasenia"
          placeholder="Contraseña"
        />
        <input type="submit" name="boton-login" value="A COPIAR" />
      </form>
    </>
  );
}

export default Login;
