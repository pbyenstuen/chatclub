import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import useSubmit from "./useSubmit";

const HeaderBar = ({ api, user, updateUser }) => {
    const history = useHistory();

    const { handleSubmit: handleLogout, submitting, error } = useSubmit(
        async () => {
            await api.auth.logOut();
        },
        async () => {
            await updateUser();
            history.push("/")
        }
    );

    if (user) {
        return (
            <div id="header-bar">
                <h1>Chatclub</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/chatters">CHATTERS</Link>
                        </li>
                        <li>
                            <Link to="/">CHAT</Link>
                        </li>
                        <li>
                            <Link to="/profile">PROFILE</Link>
                        </li>
                    </ul>
                </nav>
                <div id="header-bar-user-info">
                    <h3>{error ? "Logout failed" : user.displayName}</h3>
                    <button disabled={submitting} onClick={handleLogout}>SIGN OUT</button>
                </div>
            </div>
        );
    };

    return (
        <div id="header-bar">
            <h1>Chatclub</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/signup">SIGN UP</Link>
                    </li>
                    <li>
                        <Link to="/login">SIGN IN</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default HeaderBar;
