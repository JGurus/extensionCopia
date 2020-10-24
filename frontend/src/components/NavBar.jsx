import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import UserContext from "../context/auth/authContext";
function NavBar() {
  const { user, cerrarSesion } = useContext(UserContext);
  return (
    <nav>
      <NavLink className="img" to="/">
        <img src="logo.svg" alt="logo" />
      </NavLink>
      <ul>
        {user ? (
          <button
            onClick={() => {
              cerrarSesion();
            }}
            className="li"
            to="/login"
          >
            Cerrar Sesión
          </button>
        ) : (
          <>
            <NavLink activeClassName="active" className="li" to="/login">
              Iniciar Sesión
            </NavLink>
            <NavLink activeClassName="active" className="li" to="/signup">
              Registrarse
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
