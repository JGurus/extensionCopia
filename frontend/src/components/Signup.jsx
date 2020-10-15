import React, { useContext, useState } from "react";
import AuthContext from "../context/auth/authContext";
import "./Signup.css";
function Signup() {
  const authContext = useContext(AuthContext);
  const { signupAction } = authContext;
  const [data, setData] = useState({
    usuario: "",
    contrasenia: "",
    email: "",
  });
  const register = (e) => {
    e.preventDefault();
    if (
      !data.email.trim() ||
      !data.usuario.trim() ||
      !data.contrasenia.trim()
    ) {
      alert("Verifique sus datos");
      return;
    }
    signupAction(data);
  };
  return (
    <form
      className="signup"
      onSubmit={(e) => {
        register(e);
      }}
    >
      <input
        type="text"
        name="usuario"
        placeholder="Nombre de Usuario"
        onChange={(e) => {
          setData({ ...data, [e.target.name]: e.target.value });
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        onChange={(e) => {
          setData({ ...data, [e.target.name]: e.target.value });
        }}
      />
      <input
        type="password"
        name="contrasenia"
        placeholder="Contraseña"
        onChange={(e) => {
          setData({ ...data, [e.target.name]: e.target.value });
        }}
      />
      <input type="submit" name="boton-registro" value="ENVIAR" />
    </form>
  );
}

export default Signup;
