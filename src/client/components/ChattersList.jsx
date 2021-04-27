import React, { useState } from 'react';
import { Link } from "react-router-dom";
import useSubmit from "./useSubmit";
import ErrorView from "./ErrorView";

const ChattersList = ({ api, chatters, loading, error, updateList }) => {
    const [idToDelete, setIdToDelete] = useState("");

    const { handleSubmit: handleDeleteChatter, submitting } = useSubmit(
        async () => {
            console.log(idToDelete)
            await api.chatters.deleteChatter({ idToDelete });
        },
        async () => {
            return;
        }
    );

    const handleClick = (e, id) => {
        setIdToDelete(id);
        handleDeleteChatter(e);
        updateList();
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    return (
        <div id="chatters-container">
            {chatters.map(({ id, firstName, lastName, email }) => (
                <div id="chatter-item" key={id}>
                    <h5>{firstName} {lastName}</h5>
                    <p>{email}</p>
                    <button id="edit-btn"><Link to={`chatters/${id}/edit`}>EDIT</Link></button>
                    <button id="del-btn" onClick={(e) => handleClick(e, id)} disabled={submitting}>DELETE</button>
                </div>
            ))}
        </div>
    )
}

export default ChattersList;
