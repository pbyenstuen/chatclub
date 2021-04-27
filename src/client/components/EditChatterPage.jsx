import React from 'react';
import { useParams } from "react-router";
import useLoader from "./useLoader";
import ErrorView from "./ErrorView";
import EditChatterForm from "./EditChatterForm";

const EditChatterPage = ({ api }) => {
    const { id } = useParams();
    const { data: chatter, loading, error, reload } = useLoader(async () => await api.chatters.getChatter(id), [id]);

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    return <EditChatterForm api={api} chatter={chatter} />;
}

export default EditChatterPage;
