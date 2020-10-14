import React, { useEffect } from "react";
import "./Chat.css";
import { socket } from "../Socket";
function Chat() {
  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    socket.emit("connected");
  }, []);

  useEffect(() => {
    return () => {
      socket.off();
    };
  }, []);
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
