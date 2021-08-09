import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/actions";
import { Grid } from "@material-ui/core";
import InstaPost from "../post";
import Masonry from "react-masonry-css";
import "./postContainer.css";
import Navbar from '../navbar';

const breakpointColumnsObj5 = {
    default: 5,
    1500: 4,
    1200: 3,
    900: 2,
    600: 1
  };

  const breakpointColumnsObj = {
    default: 3,
    900: 2,
    600: 1
  };

function PostContainer(props) {
    const dispatch = useDispatch();
    let posts = useSelector((state) => state.posts.posts);
    const user = useSelector((state) => state.user.user);

    let filteredPosts;
    if(props.user){
        filteredPosts = posts.filter(post => post.author.userId === props.user.userId);
    } else {
        filteredPosts = posts;
    }

    function mycomparator(a,b) {
        return a.postId - b.postId;
    }
    const sortedPosts = filteredPosts.sort(mycomparator);
      
    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    function findIfLiked(post) {
        return post.likes.some(like => like.userId===user.userId);
    }

    return (
        <>
            <Navbar />
            <Masonry
                breakpointCols={filteredPosts.length<5 ? breakpointColumnsObj : breakpointColumnsObj5}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {sortedPosts.map((post) => (
                    <div key={post.postId}>
                        <InstaPost
                            post={post}
                            liked={findIfLiked(post)}
                        />
                    </div>
                ))}
            </Masonry>
        </>
    );
}

export default PostContainer;
