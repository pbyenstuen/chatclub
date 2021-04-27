import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useLoader from "./useLoader";
import HeaderBar from "./HeaderBar";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ProfilePage from "./ProfilePage";
import ChatPage from "./ChatPage";
import ChattersPage from "./ChattersPage";
import EditChatterPage from "./EditChatterPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

const Application = ({ api }) => {
    const { data: user, reload: updateUser } = useLoader(async () => await api.auth.getUser());

    return (
        <Router>
            <>
                <HeaderBar api={api} user={user} updateUser={updateUser} />
                <Switch>
                    <ProtectedRoute
                        exact path={"/"}
                        user={user}
                        component={ChatPage}
                        api={api}
                    />
                    <ProtectedRoute
                        exact path={"/chatters"}
                        user={user}
                        component={ChattersPage}
                        api={api}
                    />
                    <ProtectedRoute
                        path={"/chatters/:id/edit"}
                        user={user}
                        component={EditChatterPage}
                        api={api}
                    />
                    <ProtectedRoute
                        path={"/profile"}
                        user={user}
                        component={ProfilePage}
                        api={api}
                    />
                    <Route path={"/login"}>
                        <LoginPage api={api} updateUser={updateUser} />
                    </Route>
                    <Route path={"/signup"}>
                        <SignupPage api={api} />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </>
        </Router>
    );
}

export default Application;
