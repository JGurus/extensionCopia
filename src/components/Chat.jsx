import React from "react";
import "./Chat.css";
function Chat() {
  return (
    <div className="chat">
      <div className="cabecera"></div>
      <div className="mensaje"></div>
      <form action="" className="enviar">
        <input type="text" name="escribir-mensaje" placeholder="Escribe aquí" />
        <input type="submit" name="enviar-mensaje" />
      </form>
    </div>
  );
}

export default Chat;
