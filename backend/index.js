const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./database");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
connectDB();
app.use(morgan("dev"));
app.use(express.json({ extended: true }));

io.on("connection", (socket) => {
  socket.on("connected", () => {
    console.log("A user connected");
  });
});

app.use("/api/auth", require("./routes/auth.routes"));

const port = process.env.PORT || 4000;

http.listen(port, () => {
  console.log("Server running");
});
