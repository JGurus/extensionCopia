import React, { useContext, useState } from "react";
import AuthContext from "../context/auth/authState";
import "./Signup.css";
function Signup() {
  const authContext = useContext(AuthContext);
  const { signupAction } = authContext;
  const [data, setData] = useState({
    usuario: "",
    contrasenia: "",
    email: "",
  });
  const register = () => {
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
    <form className="signup">
      <input type="text" name="usuario" placeholder="Nombre de Usuario" />
      <input type="email" name="correo" placeholder="Correo" />
      <input type="password" name="contraseña" placeholder="Contraseña" />
      <input type="submit" name="boton-registro" value="ENVIAR" />
    </form>
  );
}

export default Signup;
