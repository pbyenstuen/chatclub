// Custom hook from Johannes' lectures

import React, { useEffect, useRef, useState } from "react";

const useWsChat = () => {
    const [chatLog, setChatLog] = useState([]);
    const [ws, setWs] = useState();
    const connected = useRef(false);

    const connect = () => {
        console.log("Connecting");
        const ws = new WebSocket(`ws://${window.location.host}`);
        setWs(ws);
        ws.onopen = (event) => {
            console.log("Opened", event);
            connected.current = true;
        };
        ws.onclose = () => {
            if (connected.current) {
                setTimeout(connect, 1000);
            } else {
                setTimeout(connect, 10000);
            }
            connected.current = false;
        };
        ws.onerror = (event) => {
            console.log(event);
        };
        ws.onmessage = (msg) => {
            const { username, picture, message, id } = JSON.parse(msg.data);
            setChatLog((chatLog) => [...chatLog, { username, picture, message, id }]);
        };
    }

    useEffect(() => connect(), []);

    const sendMessage = (json) => {
        ws.send(JSON.stringify(json));
    }

    return { chatLog, sendMessage };
}

export default useWsChat;
