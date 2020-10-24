import React, { useEffect, useState, useContext } from "react";
import "./Chat.css";
import { socket } from "../Socket";
import UserContext from "../context/auth/authContext";
function Chat() {
  const [mensaje, setMensaje] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    socket.emit("connected", user.usuario);
  }, [user]);

  useEffect(() => {
    socket.on("newmessage", (message) => {
      console.log(message);
    });
  }, []);

  useEffect(() => {
    return () => {
      socket.off();
    };
  }, []);

  const enviarSMS = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) {
      return;
    }
    socket.emit("message", { mensaje, usuario: user.usuario });
    setMensaje("");
  };
  return (
    <div className="chat">
      <div className="cabecera"></div>
      <div className="mensaje"></div>
      <form
        className="enviar"
        onSubmit={(e) => {
          enviarSMS(e);
        }}
      >
        <input
          type="text"
          name="escribir-mensaje"
          placeholder="Escribe aquí"
          value={mensaje}
          onChange={(e) => {
            setMensaje(e.target.value);
          }}
        />
        <input type="submit" name="enviar-mensaje" />
      </form>
    </div>
  );
}

export default Chat;
