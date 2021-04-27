const express = require("express");

const chattersApi = express.Router();

let chatters = [
    {
        id: 1,
        email: "chatterman@gmail.com",
        firstName: "Chad",
        lastName: "Chatsworth"
    },
    {
        id: 2,
        email: "brad@broadpark.no",
        firstName: "Brad",
        lastName: "Broadcast"
    }
];

const saveChatter = (newChatter) => {
    chatters.push({
        id: chatters.length + 1,
        ...newChatter
    });
}

chattersApi.post("/create", (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }

    saveChatter(req.body);
    req.session.chatters = chatters;
    res.status(201).end();
});

chattersApi.get("", (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }
    res.json(chatters);
});

chattersApi.get("/:id", (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }

    const id = parseInt(req.params.id);
    res.json(chatters.find((chatter) => chatter.id === id));
});

chattersApi.put("/:id", (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }

    const id = parseInt(req.params.id);
    const index = chatters.findIndex((chatter) => chatter.id === id);
    const { email, firstName, lastName } = req.body;
    chatters[index] = { email, firstName, lastName, id };
    req.session.chatters = chatters;
    res.status(200).end();
});

chattersApi.delete("/:id", (req, res) => {
    if (!req.user) {
        res.status(401).end();
        return;
    }

    const { id } = req.body;
    const index = chatters.findIndex((chatter) => chatter.id === id);
    chatters.splice(index, 1);
    res.status(200).end();
});

module.exports = chattersApi;
