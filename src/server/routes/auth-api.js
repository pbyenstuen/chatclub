const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const users = require("../db/users");

const authApi = express.Router();

authApi.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send();
});

authApi.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

authApi.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/")
});

authApi.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(204).send();
});

authApi.post("/signup", async (req, res) => {
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

authApi.get("/user", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }

  const user = (({ id, username, displayName = username, firstName, lastName, image }) => ({ id, username, displayName, firstName, lastName, image }))(req.user);
  res.status(200).json(user);

  console.log("USERS DB ", users.users);
  console.log("REQ.SESSION ", req.session);
});

authApi.get("/users", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }

  const userList = users.getUsers().map(({ id, username, displayName = username, firstName, lastName, image }) => {
    return { id, username, displayName, firstName, lastName, image };
  })

  res.status(200).json(userList);
});

module.exports = authApi;
