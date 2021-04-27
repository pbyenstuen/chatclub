import React from 'react'
import useLoader from "./useLoader";
import useWsChat from "./useWsChat";
import ErrorView from "./ErrorView";
import ChatView from './ChatView';

const ChatPage = ({ api }) => {
    const { data: user, loading, error, reload } = useLoader(async () => await api.auth.getUser());
    const { chatLog, sendMessage } = useWsChat();

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    return <ChatView
        user={user}
        chatLog={chatLog}
        sendMessage={sendMessage}
        api={api}
    />
}

export default ChatPage;
