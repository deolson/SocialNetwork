import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./profile.css";
import PostContainer from "./containers/postContainer";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import Navbar from "./navbar";
import { useLocation } from "react-router-dom";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Storage } from "aws-amplify";
import Button from "@material-ui/core/Button";
import { changeProfileImg } from "../redux/actions";
import SimpleModal from './editform';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        background: "blue",
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
        marginBottom: "-80px",
        marginRight: "50px",
    },
}));

function Profile() {
    const [url, setURL] = useState([]);
    const dispatch = useDispatch();
    let user = useSelector((state) => state.user.user);

    useEffect(() => {
        getProfilePicture(user.profileImg);
    });

    const getProfilePicture = (profileImg) => {
        Storage.get(profileImg)
            .then((url) => {
                var myRequest = new Request(url);
                fetch(myRequest).then(function (response) {
                    if (response.status === 200) {
                        setURL(url);
                    }
                });
            })
            .catch((err) => console.log(err));
    };

    let isLoggedInUser = true;
    const location = useLocation();
    if (location.state) {
        user = location.state;
        isLoggedInUser = false;
    }

    const styles = useStyles();

    async function onChange(e) {
        const file = e.target.files[0];
        console.log(file);
        const result = await Storage.put(file.name, file);
        const url = await Storage.get(result);
        console.log("result"+url+"and"+result);
        dispatch(changeProfileImg(file.name));
    }

    return (
        <>
            <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
                alignContent="center"
            >
                <Grid item xs={10}>
                    <Paper elevation={1} className="paper">
                        <Avatar src="" className={styles.large}>
                            <Avatar src={url} className={styles.small}></Avatar>
                        </Avatar>
                        {isLoggedInUser && <Button
                            variant="contained"
                            onChange={onChange}
                            component="label"
                            style={{marginLeft: "-50px"}}
                        >
                            <AddAPhotoIcon />
                            <input type="file" hidden />
                        </Button>}
                    </Paper>
                </Grid>
                <Grid item xs={10} style={{ textAlign: "center" }}>
                    <h1>{user.username}</h1>
                    {isLoggedInUser && <SimpleModal />}
                    {/* <Fab variant="extended" style={{ textAlign: "center" }}>
                        <EditIcon />
                        Edit Account Info
                    </Fab> */}
                </Grid>
                <Grid item xs={10}>
                    <PostContainer user={user} />
                </Grid>
            </Grid>
        </>
    );
}

export default Profile;