import React from "react";
import "./Signup.css";
function Signup() {
  return (
    <form className="signup">
      <input type="text" name="usuario" placeholder="Nombre de Usuario" />
      <input type="email" name="correo" placeholder="Correo" />
      <input type="password" name="contraseña" placeholder="Contraseña" />
      <input type="submit" name="boton-registro" value="ENVIAR" />
    </form>
  );
}

export default Signup;
