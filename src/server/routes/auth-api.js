const express = require("express");
const cors = require("cors")
const passport = require("passport");
const bcrypt = require("bcryptjs");
const users = require("../db/users");

const authApi = express.Router();

const corsOptions = {
  origin: "http://localhost:1234"
};

authApi.post("/login", cors(corsOptions), passport.authenticate("local"), (req, res) => {
  res.status(200).send();
});

authApi.get("/google", cors(corsOptions), passport.authenticate("google", { scope: ["profile", "email"] }));

authApi.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/")
});

authApi.post("/logout", cors(corsOptions), (req, res) => {
  req.logout();
  res.status(204).send();
});

authApi.post("/signup", cors(corsOptions), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (!users.createUser(req.body.username, hashedPassword)) {
      res.status(400).send();
      return;
    } else {
      res.status(201).send();
    }
  } catch {
    res.status(500).send();
  }
});

authApi.get("/user", cors(corsOptions), (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }

  const user = (({ username, displayName = username, firstName, lastName, image }) => ({ username, displayName, firstName, lastName, image }))(req.user);
  res.status(200).json(user);

  console.log(user);
  console.log("USERS DB ", users.users);
  console.log("REQ.USER ", req.user);
  console.log("REQ.SESSION ", req.session);
});

module.exports = authApi;
