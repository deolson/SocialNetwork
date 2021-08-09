import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, likePost } from "../redux/actions";
import { Link, Redirect, useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import {
    Paper,
    Slide,
    Avatar,
    Button,
    TextField,
    makeStyles,
    Typography,
    Container,
    Grid,
    CircularProgress,
    Chip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        padding: 20,
        border: "2px solid",
        borderRadius: "20px",
        background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
        height: "100%",
    },
    avatar: {
        margin: theme.spacing(1),
        background: "blue",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(3, 0, 4),
    },
    text: {
        background: "white",
    },
    wrong: {
        background: "red",
    }
}));


const initialFormData = {
    username: "",
    password: ""
  };
  

const LoginComponent = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const loggingIn = useSelector((state) => state.user.loggingIn);

    const [failedAttempt, setAttempt] = React.useState(false);
    const [formData, updateFormData] = React.useState(initialFormData);

    const toggleChecked = () => setAttempt(failedAttempt => true);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toggleChecked();
        dispatch(userLogin(formData.username, formData.password));
    };

    if(isLoggedIn) {
        // return (<Redirect push to="/home" />);
        history.push("/home");
    };

    return (
        <div style={{ overflow: 'hidden', height: '100%' }}>

        <Slide direction="up" in={true} timeout={600}>
            <Container
                component="main"
                maxWidth="xs"
                style={{ position: "relative" }}
            >
                <div className={styles.paper}>
                    <Paper className={styles.header} />
                    {loggingIn ? <CircularProgress /> : failedAttempt ?
                        <Avatar className={styles.wrong}>
                            <LockOutlinedIcon />
                        </Avatar>
                        :
                        <Avatar className={styles.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                    }
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {!loggingIn && failedAttempt && <Chip className={styles.chip} label="Failed Login" color="secondary" variant="outlined" />}
                    <form className={styles.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            className={styles.text}
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            className={styles.text}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={styles.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container style={{textAlign: 'center'}}>
                            <Grid item xs>
                                <Link to="signUp">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link to="/passwordReset">
                                    {"Forgot password?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Slide>
        </div>
    );
};

export default LoginComponent;
