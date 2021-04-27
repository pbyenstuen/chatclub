import React, { useState } from 'react';
import useSubmit from "./useSubmit";
import InputField from "./InputField";

export const ChatView = ({ user, sender, recipient, chatLog, sendMessage, api }) => {
    const [message, setMessage] = useState("");

    const { handleSubmit: handleStoreMessage, submitting } = useSubmit(
        async () => {
            await api.messages.storeMessage({ message });
        }, () => {
            return;
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = user.displayName;
        const picture = user.image ? user.image : null;
        sendMessage({ recipient, username, picture, message });
        handleStoreMessage(e);
        setMessage("");
    };

    return (
        <div id="chat-container">
            <header>
                <h2>Chat</h2>
            </header>
            <main id="chat-main">
                {chatLog.map(({ id, username, picture, message }) => (
                    <div key={id} className={user.displayName === username ? "message personal" : "message recipient"}>
                        <div className="message-user-info">
                            {picture && <img src={picture} alt={username} />}
                            <h5>{username}</h5>
                        </div>
                        <p>{message}</p>
                    </div>
                ))}
            </main>
            <footer id="chat-footer">
                <form id="chat-form" onSubmit={handleSubmit}>
                    <InputField
                        className={"chat-input"}
                        autoFocus={true}
                        placeholder={"Write here..."}
                        value={message}
                        onValueChange={setMessage} />
                    <button disabled={submitting}>Send</button>
                </form>
            </footer>
        </div>
    );
};

export default ChatView;
 