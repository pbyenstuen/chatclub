import React, { useState } from 'react';
import useSubmit from "./useSubmit";
import InputField from "./InputField";

const CreateChatterForm = ({ api, updateList }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [inputError, setInputError] = useState();

    const { handleSubmit: handleCreateChatter, submitting, error } = useSubmit(
        async () => {
            await api.chatters.createChatter({
                email: email,
                firstName: firstName,
                lastName: lastName
            });
        }, () => {
            updateList();
        }
    );

    const validateInput = (e) => {
        e.preventDefault();
        if (!email || !firstName || !lastName) {
            setInputError("Please enter all fields");
            setTimeout(() => {
                setInputError("");
            }, 2000);
            return;
        }
        handleCreateChatter(e);
    };

    return (
        <div id="create-chatter-form">
            <h4>CREATE NEW CHATTER</h4>
            <form onSubmit={validateInput}>
                {submitting && <h4>Please wait...</h4>}
                {error && <h5>{error.toString()}</h5>}
                {inputError && <h5>{inputError.toString()}</h5>}
                <InputField
                    label={"Email"}
                    type={"email"}
                    value={email}
                    onValueChange={setEmail} />
                <InputField
                    label={"First name"}
                    value={firstName}
                    onValueChange={setFirstName} />
                <InputField
                    label={"Last name"}
                    value={lastName}
                    onValueChange={setLastName} />
                <button className="submit-btn" type="submit" disabled={submitting}>CREATE CHATTER</button>
            </form>
        </div>
    );
};

export default CreateChatterForm;
