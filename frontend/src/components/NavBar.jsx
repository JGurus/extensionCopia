import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <NavLink className="img" to="/">
        <img src="logo.svg" alt="logo" />
      </NavLink>

      <ul>
        <NavLink activeClassName="active" className="li" to="/login">
          Iniciar Sesión
        </NavLink>
        <NavLink activeClassName="active" className="li" to="/signup">
          Registrarse
        </NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
