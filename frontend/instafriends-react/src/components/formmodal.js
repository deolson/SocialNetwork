import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { Grid, Paper, Avatar, TextField, Button, Fab } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockIcon from "@material-ui/icons/Lock";
import Checkbox from "@material-ui/core/Checkbox";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import { Storage } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/actions";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const initialFormData = {
    message: "",
};

export default function SimpleModal() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [formData, updateFormData] = React.useState(initialFormData);
    let file = {name:""};

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const paperStyle = {
        padding: 30,
        width: "20vw",
        minWidth: "300px",
        margin: "20px auto",
    };

    async function onChange(e) {
        file = e.target.files[0];
        const result = await Storage.put(file.name, file);
        const url = await Storage.get(result);
        // dispatch(changeProfileImg(file.name));
    }

    const handleMessageChange = (e) => {
        console.log(formData);
        console.log(e);
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(formData);
        // console.log(file.name);

        dispatch(createPost(formData.message, file.name));
        handleClose();
    }

    const body = (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ height: "80vh" }}
        >
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Fab
                        size="small"
                        color="secondary"
                        aria-label="add"
                        className={classes.margin}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </Fab>
                    <h2>Create A Cat Post!</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Message of Post"
                        placeholder="Message"
                        fullWidth
                        id="message"
                        name="message"
                        onChange={handleMessageChange}
                    />
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={onChange}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Button
                        type="submit"
                        color="primary"
                        style={{
                            background:
                                "linear-gradient(45deg, #FE6B8B, #FF8E53)",
                        }}
                        variant="contained"
                        fullWidth
                    >
                        Create Post
                    </Button>
                </form>
            </Paper>
        </Grid>
    );

    return (
        <div>
            <IconButton
                edge="start"
                className={classes.root}
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpen}
            >
                <AddIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
