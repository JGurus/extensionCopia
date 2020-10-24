const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./database");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ extended: true }));
let userConnected = {};
io.on("connection", (socket) => {
  socket.on("connected", (usuario) => {
    userConnected[usuario] = usuario;
  });
  socket.on("message", (message) => {
    socket.broadcast.emit("newmessage", message);
    console.log(message);
  });
});

app.use("/api/auth", require("./routes/auth.routes"));

const port = process.env.PORT || 4000;

http.listen(port, () => {
  console.log("Server running");
});
