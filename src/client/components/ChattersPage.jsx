import React from 'react';
import useLoader from "./useLoader";
import ChattersList from './ChattersList';
import CreateChatterForm from './CreateChatterForm';

const ChattersPage = ({ api }) => {
    const { data: chatters, loading, error, reload: updateList } = useLoader(async () => await api.chatters.getChatters());

    return (
        <>
            <header>
                <h2>Chatters</h2>
            </header>
            <div id="chatters-page">
                <CreateChatterForm
                    api={api}
                    updateList={updateList}
                />
                <ChattersList
                    api={api}
                    chatters={chatters}
                    loading={loading}
                    error={error}
                    updateList={updateList}
                />
            </div>
        </>
    )
}

export default ChattersPage;
