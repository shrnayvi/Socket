const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use("/static", express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.get("/", (req, res) => {
  res.render("index");
});
app.use(express.static(__dirname + "/../public"));

app.use(bodyParser.urlencoded({ limit: "500kb", extended: "true" }));
app.use(bodyParser.json({ limit: "500kb" }));

const server = app.listen(8000, () => {
  console.log(`listening to port 8000`);
});

const io = require("socket.io")(server);
io.of("/chat").on("connection", socket => {
  socket.emit("test", { test: "test message" });
  socket.on("chat", data => {
    socket.broadcast.emit('chat', data);
  });
});
