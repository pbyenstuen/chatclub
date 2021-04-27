const express = require("express");

const messagesApi = express.Router();

let messages = [];

const getMessageState = (messages) => {
    const messageCount = messages.length;
    return { messages, messageCount };
}

messagesApi.post("", (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }

    messages.push(req.body.message);
    req.session.messages = messages;
    console.log(req.session);

    res.json({});
    res.status(200).send;
});

messagesApi.get("", (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }

    res.json(getMessageState(req.session.messages));
});

module.exports = messagesApi;
