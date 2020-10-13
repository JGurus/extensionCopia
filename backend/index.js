const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json({ extended: true }));

app.use("/api", require("./routes/app.routes"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server running");
});
