import React from "react";
import "./Alerta.css";
function Alerta({ msg, categoria }) {
  return (
    <div className={categoria}>
      <p>{msg}</p>
    </div>
  );
}

export default Alerta;
