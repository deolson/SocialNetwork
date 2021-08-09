import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import Login from "../login";
import SignUp from "../signUp";
import ResetPassword from "../passwordReset"
import Catbackground from "../catbackground.js";
import { Paper } from "@material-ui/core";
import App from '../../App';
import { useSelector } from "react-redux";

function LoginContainer() {

    const history = useHistory();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    
    if(isLoggedIn) {
        history.push("/home");
    };
    
    return (
        <div>
            <Catbackground />
            <Paper elevation={6} style={{background: "linear-gradient(45deg, #FE6B8B, #FF8E53)"}}>
                <h1 style={{ textAlign: "center", margin: 0 }}>InstaFriends</h1>
                <p style={{ textAlign: "center", margin: 0, paddingBottom: 10 }}>
                    The Internet's Largest Collection of Cats!
                </p>
            </Paper>
            <Router>
                <Switch>
                    <Route path="/home" component={App} />
                    <Route path="/signUp" component={SignUp} />
                    <Route path="/passwordReset" component={ResetPassword} />
                    <Route path="/" component={Login} />
                </Switch>
            </Router>
        </div>
    );
}

export default LoginContainer;
