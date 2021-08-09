import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginContainer from "./components/containers/loginContainer";
import LoggedInContainer from "./components/containers/loggedInContainer";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    paper: {
        // height: "100%",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
});

function App() {

    const styles = useStyles();

    return (
        <div className={styles.paper}>
            <Router>
                <Switch>
                    <Route path="/home" component={LoggedInContainer}/>
                    <Route path="/" component={LoginContainer} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
