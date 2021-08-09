import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userConstants } from "../redux/actionTypes";
import { forgotPassword } from "../redux/actions";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
    Paper,
    Slide,
    Button,
    TextField,
    makeStyles,
    Typography,
    Container,
} from "@material-ui/core";

const initialFormData = {
    username: "",
  };

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
        overflow: "hidden",
    },
    avatar: {
        margin: theme.spacing(1),
        background: "blue",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
    },
    text: {
        background: "white",
    },
}));

const ResetPassword = () => {
    const styles = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [formData, updateFormData] = React.useState(initialFormData);


    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(formData.username, formData.password));
        history.push("/login");
    };

    return (
        <Slide direction="left" in={true} timeout={600}>
            <Container
                component="main"
                maxWidth="xs"
                style={{ position: "relative" }}
            >
                <div className={styles.paper}>
                    <Paper className={styles.header} />
                    <Typography component="h1" variant="h5" align="center">
                        Please Enter Your Username and We'll Get You Started In The Process of Resetting Your Password
                    </Typography>
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
                            onChange={handleChange}
                            autoComplete="username"
                        />
                        <Link to="/login"></Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={styles.submit}
                        >
                            Reset Password
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

export default ResetPassword;
