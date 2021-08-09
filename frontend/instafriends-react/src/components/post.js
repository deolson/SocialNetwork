import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blueGrey, grey, red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useState, useEffect } from "react";
import axios from 'axios';
import { likePost, unlikePost } from "../redux/actions";
import { Storage } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";


//Pass a post in as a prop and a boolean value if the current user liked the post
function InstaPost(props) {
    const dispatch = useDispatch();
    const post = props.post;
    const styles = useStyles();
    const [liked, toggleLike] = useState(props.liked);
    
    const [url, setURL] = useState([]);

    const handleLikeClick = () => {
        if(liked) {
            dispatch(unlikePost(post));
        } else {
            dispatch(likePost(post));  
        }
        toggleLike(!liked);
    };


    useEffect(() => {
        getProfilePicture(post.imgURL);
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

    return (
        <Card className={styles.root} variant="outlined">
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={styles.avatar}>
                        {post.author.firstname.charAt(0)}
                    </Avatar>
                }
                title={
                    <Typography variant="h6" className={styles.header}>
                        {post.author.firstname + " " + post.author.lastname}
                    </Typography>
                }
                action={ liked
                        ?   <IconButton onClick={handleLikeClick} aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        : <IconButton onClick={handleLikeClick} aria-label="add to favorites">
                                <FavoriteBorderIcon />
                            </IconButton>
                    }
            />
            {post.imgURL && (
                <CardMedia
                    className={styles.media}
                    image={url}
                    title="Paella dish"
                />
            )}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 250,
        maxWidth: 250,
        backgroundColor: grey[300],
    },
    media: {
        height: 0,
        paddingTop: "100%",
    },
    avatar: {
        backgroundColor: grey[500],
    },
    header: {
        textAlign: "left",
    },
}));

export default InstaPost;
