import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockIcon from "@material-ui/icons/Lock";
import Checkbox from "@material-ui/core/Checkbox";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import EditIcon from "@material-ui/icons/Edit";
import { useLocation } from "react-router-dom";
import { getAllUsers } from "../redux/actions";

import { updateAccount } from "../redux/actions";

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
  userId: "",
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  email: "",
};

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);
  console.log("the user variable: " + user.username);
  initialFormData.userId = user.userId;
  initialFormData.username = user.username;
  initialFormData.password = user.password;
  initialFormData.firstname = user.firstname;
  initialFormData.lastname = user.lastname;
  initialFormData.email = user.email;

  const [formData, updateFormData] = React.useState(initialFormData);
  console.log("updated initial form data: " + formData.userId);

  const handleChange = (e) => {
    console.log("e.target.value: " + e.target.value.trim());
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    console.log("INSIDE handle submit: " + e);
    e.preventDefault();

    dispatch(updateAccount(formData));
    console.log("dispatching form data: " + formData);

    //handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Grid>
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Update Account Info
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <TextField
                  label="Username"
                  name="username"
                  style={{ margin: 8 }}
                  id="outlined-margin-none"
                  defaultValue=""
                  className={classes.textField}
                  helperText=""
                  variant="outlined"
                  onChange={handleChange}
                />
                {/* <span className="item-name">{user.username}</span> */}
                <TextField
                  label="Password"
                  name="password"
                  style={{ margin: 8 }}
                  id="outlined-margin-none"
                  defaultValue=""
                  className={classes.textField}
                  helperText=""
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  label="First Name"
                  name="firstname"
                  style={{ margin: 8 }}
                  id="outlined-margin-none"
                  defaultValue=""
                  className={classes.textField}
                  helperText=""
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  label="Last Name"
                  name="lastname"
                  style={{ margin: 8 }}
                  id="outlined-margin-none"
                  defaultValue=""
                  className={classes.textField}
                  helperText=""
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-full-width"
                  label="Email"
                  name="email"
                  style={{ margin: 8 }}
                  placeholder="emailaddress"
                  helperText=""
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        backgroundColor="red"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        onClick={handleOpen}
      >
        <EditIcon />
        Edit Account Info
      </button>
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