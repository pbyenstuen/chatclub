const express = require("express");
const cors = require("cors")

const chatApi = express.Router();

let messages = [];

const getMessageState = (messages) => {
    const numberOfMessages = messages.length;
    return { messages, numberOfMessages };
}

chatApi.post("/message", (req, res) => {
    messages.push(req.body.message);
    req.session.messages = messages;
    console.log(req.session);
    res.json({});
    res.status(200).send;
});

chatApi.get("/message", (req, res) => {
    res.json(getMessageState(req.session.messages));
});

module.exports = chatApi;
