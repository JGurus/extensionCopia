const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const Message = require("./models/Messages");
connectDB();
app.use(cors());
app.use(express.json({ extended: true }));
let userConnected = {};
io.on("connection", (socket) => {
  socket.on("connected", async (usuario) => {
    userConnected[usuario] = usuario;
    const mensajes = await Message.find();
    socket.emit("loadMessages", mensajes);
  });
  socket.on("message", async (message) => {
    try {
      const mensaje = new Message(message);
      await mensaje.save();
      socket.broadcast.emit("newmessage", {
        mensaje: mensaje.mensaje,
        usuario: mensaje.usuario,
      });
    } catch (error) {
      console.log(error);
    }
  });
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

const port = process.env.PORT || 4000;

http.listen(port, () => {
  console.log("Server running");
});
