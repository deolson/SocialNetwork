import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import PostContainer from "./postContainer";
import Profile from "../profile";

function LoggedInContainer() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    // const posts = useSelector((state) => state.posts.posts);
    // const dispatch = useDispatch();
    const history = useHistory();

    if (!isLoggedIn) {
        // return <Redirect push to="/" />;
        history.push("/");
    }

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/profile" component={Profile} />
                    <Route path="/user/:username" component={Profile} />
                    <Route path="/home" component={PostContainer} />
                </Switch>
            </Router>
        </>
    );
}

export default LoggedInContainer;
