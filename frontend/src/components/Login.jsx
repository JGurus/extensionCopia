import React from "react";
import "./Login.css";
function Login() {
  return (
    <form className="login" action="">
      <input type="text" name="usuario" placeholder="Nombre de Usuario" />
      <input type="password" name="contrasenia" placeholder="Contraseña" />
      <input type="submit" name="boton-login" value="A COPIAR" />
    </form>
  );
}

export default Login;
