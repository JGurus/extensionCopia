import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Chat.css";
import { socket } from "../Socket";
import UserContext from "../context/auth/authContext";
function Chat() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const { user, cerrarSesion } = useContext(UserContext);
  const divRef = useRef(null);

  useEffect(() => {
    socket.emit("connected", user.usuario);
    socket.on("loadMessages", (messages) => {
      setMensajes(messages);
    });
  }, [user]);

  useEffect(() => {
    socket.on("newmessage", (message) => {
      console.log(message);
      setMensajes([...mensajes, message]);
    });
    if (divRef.current !== null) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [setMensajes, mensajes]);

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
    setMensajes([...mensajes, { mensaje, usuario: user.usuario }]);
    socket.emit("message", { mensaje, usuario: user.usuario });
    setMensaje("");
  };
  return (
    <div className="chat">
      <div className="cabecera">
        <ul>
          {user ? (
            user.admin === true ? (
              <NavLink to="/admin">
                <img src="/images/active.svg" alt="Active" />
              </NavLink>
            ) : null
          ) : null}
          <NavLink to="/documento">
            <img src="/images/documento.svg" alt="Documento" />
          </NavLink>
          <li
            onClick={() => {
              cerrarSesion();
            }}
          >
            <img src="/images/logout.svg" alt="Cerrar Sesión" />
          </li>
        </ul>
      </div>
      <div className="mensaje" ref={divRef}>
        {mensajes.map((msg, index) => (
          <div
            key={index}
            id={msg.usuario === user.usuario ? "derecha" : "izquierda"}
          >
            <span>{msg.usuario}</span>
            <p key={index}>{msg.mensaje}</p>
          </div>
        ))}
      </div>
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
