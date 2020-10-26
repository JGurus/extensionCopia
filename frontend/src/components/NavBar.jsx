import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink, useLocation } from "react-router-dom";
import UserContext from "../context/auth/authContext";
function NavBar() {
  const { user, cerrarSesion } = useContext(UserContext);
  const location = useLocation();
  if (location.pathname === "/messages") return null;
  return (
    <nav>
      <NavLink className="img" to="/">
        <img src="logo.svg" alt="logo" />
      </NavLink>
      <ul>
        {user ? (
          <button
            className="li"
            onClick={() => {
              cerrarSesion();
            }}
          >
            Cerrar Sesion
          </button>
        ) : (
          <>
            <NavLink activeClassName="active" className="li" to="/login">
              Iniciar Sesión
            </NavLink>
            <NavLink activeClassName="active" className="li" to="/signup">
              Registrarte
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
