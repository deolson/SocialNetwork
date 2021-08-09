import React, { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, userLogout } from "../redux/actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SimpleModal from "./formmodal";

const useStyles = makeStyles((theme) => ({
    root: {
        background: alpha(theme.palette.common.white, 0.20),
        margin: "10px",
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    inputRoot: {
        color: "inherit",
    },
}));

const initialFormData = {
    username: "",
};

export default function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const users = useSelector((state) => state.allUsers.users);
    const [formData, updateFormData] = React.useState(initialFormData);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        console.log("here");
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleChange = (event, value) => {
        console.log(event);
        if (event.key === "enter") {
            handleSubmit(event.value);
        }
        updateFormData({
            ...formData,
            username: value.trim(),
        });
    };

    function isUser(user) {
        return user.username === formData.username;
    }

    const home = () => {
        history.push("/home");
    }

    const profile = () => {
        history.push("/profile");
    }

    const handleSubmit = (e) => {
        console.log("submitted");
        console.log(`/user/${formData.username}`);
        const stateData = users.find(isUser);
        console.log("stateData" + stateData);
        history.push(`/user/${formData.username}`, stateData);
    };

    
    const handleLogout = () => {
        console.log("here");
        dispatch(userLogout());
        history.push("/");
    };

    return (
        <div className="{classes.grow}">
            <AppBar
                style={{
                    background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
                }}
            >
                <Toolbar>
                    <Button style={{color: "white", width:"10vw"}} onClick={home}>
                        InstaFriends
                    </Button>
                    <Autocomplete
                        id="auto-box"
                        options={users}
                        freeSolo
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit();
                            }
                        }}
                        getOptionLabel={(option) => option.username}
                        style={{
                            minWidth: "250px",
                            backgroundColor: "white",
                            marginLeft: "50px",
                        }}
                        clearOnEscape
                        onInputChange={handleChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search Users"
                                variant="outlined"
                            />
                        )}
                    />
                    <div className={classes.grow} />
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={profile}
                        >
                            <AccountCircle />
                        </IconButton>
                        {/* <IconButton
                            edge="start"
                            className={classes.root}
                            color="inherit"
                            aria-label="open drawer"
                            
                        >
                            <AddIcon />
                        </IconButton> */}
                        <SimpleModal />
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleLogout}
                        >
                            <ExitToAppIcon />
                        </IconButton>
                </Toolbar>
            </AppBar>

        </div>
    );
}
