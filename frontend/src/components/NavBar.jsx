import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
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
