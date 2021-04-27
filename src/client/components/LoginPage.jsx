import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import useSubmit from "./useSubmit";
import InputField from "./InputField";

const LoginPage = ({ api, updateUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const { handleSubmit: handleLogin, submitting, error } = useSubmit(
        async () => {
            await api.auth.logIn({ username, password });
        },
        async () => {
            await updateUser();
            history.push("/")
        }
    );

    return (
        <div id="login-container">
            <header id="auth-header">
                <h2>SIGN IN</h2>
            </header>
            <form onSubmit={handleLogin}>
                {submitting && <h4>Please wait...</h4>}
                {error && <h4>{error.toString()}</h4>}
                <InputField
                    label={"Username"}
                    value={username}
                    onValueChange={setUsername}
                />
                <InputField
                    label={"Password"}
                    type={"password"}
                    value={password}
                    onValueChange={setPassword}
                />
                <button className="submit-btn" disabled={submitting}>SIGN IN</button>
            </form>
            <div id="signup-options-container">
                <h3>Don't have an account?</h3>
                <Link to="/signup">SIGN UP</Link>
                <h4>OR</h4>
                <a href="/api/auth/google"><button id="google-btn">SIGN IN WITH GOOGLE</button></a>
            </div>
        </div>
    );
};

export default LoginPage;