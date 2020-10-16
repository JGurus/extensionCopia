import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import AlertContext from "../context/alert/alertContext";
import Alerta from "../components/Alerta";
import "./Signup.css";
function Signup() {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { message, signupAction } = authContext;
  const { alerta, mostrarAlerta } = alertContext;
  const [data, setData] = useState({
    usuario: "",
    contrasenia: "",
    email: "",
  });

  useEffect(() => {
    if (message) {
      mostrarAlerta(message.msg, message.categoria);
    }
  }, [message]);

  const register = (e) => {
    e.preventDefault();
    if (!data.usuario.trim()) {
      mostrarAlerta("El usuario es requerido", "error");
      return;
    }
    if (!data.email.trim()) {
      mostrarAlerta("El email es requerido", "error");
      return;
    }
    if (!data.contrasenia.trim()) {
      mostrarAlerta("La contraseña es requerida", "error");
      return;
    }
    signupAction(data);
    setData({
      usuario: "",
      contrasenia: "",
      email: "",
    });
  };
  return (
    <>
      {alerta !== null ? (
        <Alerta msg={alerta.msg} categoria={alerta.categoria} />
      ) : null}
      <form
        className="signup"
        onSubmit={(e) => {
          register(e);
        }}
      >
        <input
          type="text"
          name="usuario"
          value={data.usuario}
          placeholder="Nombre de Usuario"
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        />
        <input
          type="password"
          name="contrasenia"
          value={data.contrasenia}
          placeholder="Contraseña"
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        />
        <input type="submit" name="boton-registro" value="ENVIAR" />
      </form>
    </>
  );
}

export default Signup;
