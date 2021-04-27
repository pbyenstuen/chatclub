require("dotenv").config();
const express = require("express");
const path = require("path");
const ws = require("ws");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const users = require("./db/users");
const authApi = require("./routes/auth-api");
const chatApi = require("./routes/chat-api");
const chattersApi = require("./routes/chatters-api");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  session({
    secret: "dsEUgh46Hs??&gsq234GG12g6&?G!",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport config
const initializePassport = require("./config/passport-config");
initializePassport(passport, users);

app.use(cookieParser("dsEUgh46Hs??&gsq234GG12g6&?G!"));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.use(passport.initialize());
app.use(passport.session());

let msgIndex = 0;
const sockets = [];

const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket) => {
  sockets.push(socket);
  socket.on("message", (msg) => {
    const { username, picture, message } = JSON.parse(msg);
    const id = msgIndex++;
    for (const recipient of sockets) {
      recipient.send(JSON.stringify({ id, username, picture, message }));
    }
  });
});

// Routes
app.use("/api/auth", authApi);
app.use("/api/chat", chatApi);
app.use("/api/chatters", chattersApi);

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Started server on http://localhost:${PORT}`);

  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connection", socket, req);
    });
  });
});

module.exports = app;
