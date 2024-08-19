const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("../routes/user.js");
const gameRoute = require("../routes/game.js");

app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(express.static("public"));

const port = 3000;

app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/game", gameRoute);

app.get("/", (req, res) => {
  res.status(300).redirect("./info.html");
});

let server = app.listen(port, () => {
  console.log(`REST API is running at http://localhost:${port}`);
});

module.exports = server;
