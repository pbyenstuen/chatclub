import React, { useState } from "react";
import { useHistory } from "react-router";
import useSubmit from "./useSubmit";
import InputField from "./InputField";

const SignupPage = ({ api }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [inputError, setInputError] = useState();
    const history = useHistory();

    const { handleSubmit: handleSignup, submitting, error } = useSubmit(
        async () => {
            await api.auth.signUp({
                username: username,
                password: password
            });
        },
        async () => {
            history.push("/login");
        }
    );

    const validateInput = (e) => {
        e.preventDefault();
        if (password !== confirm) { setInputError("Passwords do not match"); return; }
        if (!username || !password || !confirm) { setInputError("Please enter all fields"); return; }
        handleSignup(e);
    }

    return (
        <div id="signup-container">
            <header id="auth-header">
                <h2>SIGN UP</h2>
            </header>
            <form onSubmit={validateInput}>
                {submitting && <h4>Please wait...</h4>}
                {error && <h4>{error.toString()}</h4>}
                {inputError && <h4>{inputError.toString()}</h4>}
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
                <InputField
                    label={"Confirm password"}
                    type={"password"}
                    value={confirm}
                    onValueChange={setConfirm}
                />
                <button className="submit-btn" type="submit" disabled={submitting}>SIGN UP</button>
            </form>
        </div>
    );
};

export default SignupPage;