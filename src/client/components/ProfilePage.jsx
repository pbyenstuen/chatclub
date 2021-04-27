import React, { useEffect } from "react";
import useLoader from "./useLoader";
import ErrorView from "./ErrorView";

const ProfilePage = ({ api }) => {
    const { data: user, loading, error, reload } = useLoader(async () => await api.auth.getUser());

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    return (
        <div id="profile-container">
            <header>
                <h2>Profile</h2>
            </header>
            <div id="profile-card">
                {Object.entries(user).length > 2 ?
                    <>
                        <img src={user.image} alt={user.displayName} />
                        <div>
                            <h4>USERNAME/EMAIL</h4>
                            <p>{user.username}</p>
                            <h4>DISPLAY NAME</h4>
                            <p>{user.displayName}</p>
                            <h4>FIRST NAME</h4>
                            <p>{user.firstName}</p>
                            <h4>LAST NAME</h4>
                            <p>{user.lastName}</p>
                        </div>
                    </>
                    :
                    <div>
                        <h4>USERNAME</h4>
                        <p>{user.username}</p>
                    </div>}
            </div>
        </div>
    )
}

export default ProfilePage;
