import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAccount } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";
import {
    Paper,
    Slide,
    Button,
    TextField,
    makeStyles,
    Typography,
    Container,
    CircularProgress,
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';

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
    },
    avatar: {
        margin: theme.spacing(1),
        background: "blue",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
    },
    text: {
        background: "white",
        margin: theme.spacing(0, 0, 1),
    },
}));

const initialFormData = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  };

const SignUp = () => {
    const styles = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const isRegistering = useSelector((state) => state.user.isRegistering);
    const registered = useSelector((state) => state.user.registered);

    const [failedAttempt, setAttempt] = React.useState(false);
    const toggleAttempt = () => setAttempt(failedAttempt => true);

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toggleAttempt();
        if(formData.username && formData.password && formData.firstname && formData.lastname && formData.email ) {
            dispatch(registerAccount(formData));
        }
    };
    
    if(registered) {
        history.push("/login");
    }

    return (
        <Slide direction="right" in={true} timeout={600}>
            <Container
                component="main"
                maxWidth="xs"
                style={{ position: "relative" }}
            >
                <div className={styles.paper}>
                    <Paper className={styles.header} />
                    {isRegistering && <CircularProgress />}
                    {failedAttempt&& <Alert style={{paddingTop: 0, paddingBottom: 0, marginBottom: 5}} severity="error">Username / Email Already Exists</Alert>}
                    <Typography component="h1" variant="h5" align="center">
                        Sign Up!
                    </Typography>
                    <Typography component="p" align="center">
                        And Get Friends Instantly
                    </Typography>
                    <form className={styles.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            error={ !formData.username&&failedAttempt ? true : false}
                            variant="outlined"
                            margin="normal"
                            className={styles.text}
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            onChange={handleChange}
                        />
                        <TextField
                            error={ !formData.password&&failedAttempt ? true : false}
                            variant="outlined"
                            margin="normal"
                            className={styles.text}
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                        />
                        <TextField
                            error={ !formData.firstname&&failedAttempt ? true : false}
                            variant="outlined"
                            margin="normal"
                            className={styles.text}
                            required
                            fullWidth
                            id="firstname"
                            label="First Name"
                            name="firstname"
                            onChange={handleChange}
                        />
                        <TextField
                            error={ !formData.lastname&&failedAttempt ? true : false}
                            variant="outlined"
                            margin="normal"
                            className={styles.text}
                            required
                            fullWidth
                            id="lastname"
                            label="Last Name"
                            name="lastname"
                            onChange={handleChange}
                        />
                        <TextField
                            error={ !formData.email&&failedAttempt ? true : false}
                            variant="outlined"
                            margin="normal"
                            className={styles.text}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={handleChange}
                        />
                        <Link to="/login"></Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={styles.submit}
                        >
                            Submit Registration
                        </Button>
                        <Link to="/login">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary" > Back </Button>
                        </Link>
                    </form>
                </div>
            </Container>
        </Slide>
    );
};

export default SignUp;

