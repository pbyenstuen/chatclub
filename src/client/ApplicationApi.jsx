import { fetchJSON, postJSON, getResponse } from "./lib/http";

const api = {
    auth: {
        logIn: async (credentials) => {
            return await postJSON("/auth/login", {
                method: "POST",
                payload: credentials
            });
        },

        signUp: async (credentials) => {
            return await postJSON("/auth/signup", {
                method: "POST",
                payload: credentials
            });
        },

        logOut: async () => {
            return await postJSON("/auth/logout", {
                method: "POST",
            });
        },

        getUser: async () => {
            const response = await getResponse("/auth/user");
            return (response.status === 401 ? undefined : await response.json());
        },
        getUsers: async () => {
            return await fetchJSON("/auth/users");
        },
    },

    messages: {
        storeMessage: async (message) => {
            return await postJSON("/messages", {
                method: "POST",
                payload: message
            });
        },
        getMessages: async () => {
            return await fetchJSON("/messages");
        }
    },

    chatters: {
        createChatter: async (chatter) => {
            return await postJSON("/chatters/create", {
                method: "POST",
                payload: chatter
            });
        },

        getChatters: async () => {
            return await fetchJSON("/chatters");
        },

        getChatter: async (id) => {
            return await fetchJSON(`/chatters/${id}`);
        },

        updateChatter: async (id, { email, firstName, lastName }) => {
            return await postJSON(`/chatters/${id}`, {
                method: "PUT",
                payload: { email, firstName, lastName }
            });
        },

        deleteChatter: async (id) => {
            return await postJSON(`/chatters/${id}`, {
                method: "DELETE"
            });
        }
    }
};

export default api;
