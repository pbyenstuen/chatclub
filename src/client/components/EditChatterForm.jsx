import React, { useState } from "react";
import { useHistory } from "react-router";
import useSubmit from "./useSubmit";
import InputField from "./InputField";

const EditChatterForm = ({ api, chatter }) => {
    const [email, setEmail] = useState(chatter.email);
    const [firstName, setFirstName] = useState(chatter.firstName);
    const [lastName, setLastName] = useState(chatter.lastName);
    const history = useHistory();

    const { handleSubmit: handleUpdateChatter, submitting, error } = useSubmit(
        async () => {
            await api.chatters.updateChatter(chatter.id, { email, firstName, lastName });
        },
        async () => {
            history.push("/chatters");
        }
    );

    return (
        <>
            <header>
                <h2>Edit Chatter</h2>
            </header>
            <div id="edit-chatter-container">
                <form onSubmit={handleUpdateChatter}>
                    <h3>{email}</h3>
                    {submitting && <h4>Please wait...</h4>}
                    {error && <h4>{error.toString()}</h4>}
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
                    <button className="submit-btn" disabled={submitting}>SAVE CHANGES</button>
                </form>
            </div>
        </>
    );
}

export default EditChatterForm;
