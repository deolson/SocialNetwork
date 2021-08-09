import { constants } from "./actionTypes";
import { userService } from "./service";

export const userLogin = (username, password) => async (dispatch) => {
    try {
        console.log("FIRST login");
        dispatch({ type: constants.LOGIN_REQUEST });
        const res = await userService.login(username, password);
        dispatch({
            type: constants.LOGIN_SUCCESS,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.LOGIN_FAILURE,
            payload: [],
        });
    }
};

export const userLogout = () => async (dispatch) => {
    dispatch({ type: constants.LOGOUT });
};

export const forgotPassword = (username) => async () => {
    try {
        console.log("forgot password action");
        userService.forgotPassword(username);
    } catch (e) {
        console.log(e);
    }
};

export const registerAccount = (User) => async (dispatch) => {
    try {
        console.log("registerAccount action");
        dispatch({ type: constants.REGISTER_REQUEST });
        const res = await userService.register(User);
        dispatch({ type: constants.REGISTER_SUCCESS });
        dispatch({
            type: constants.LOGIN_SUCCESS,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.REGISTER_FAILURE,
        });
    }
};

export const getAllPosts = () => async (dispatch) => {
    try {
        console.log("registerAccount action");
        dispatch({ type: constants.POSTS_GETALL_REQUEST });
        const res = await userService.getAllPosts();
        dispatch({
            type: constants.POSTS_GETALL_SUCCESS,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.POSTS_GETALL_FAILURE,
        });
    }
};

export const getAllUsers = () => async (dispatch) => {
    try {
        console.log("all user action");
        dispatch({ type: constants.USERS_GETALL_REQUEST });
        const res = await userService.getAllUsers();
        dispatch({
            type: constants.USERS_GETALL_SUCCESS,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.USERS_GETALL_FAILURE,
        });
    }
};

export const likePost = (post) => async (dispatch) => {
    try {
        console.log("like action");
        const res = await userService.likePost(post);
        console.log("like"+res);
        // dispatch({
        //     type: constants.POSTS_LIKE_POST_SUCCESS,
        //     payload: res,
        // });
    } catch (error) {
        console.log("Like error");
    }
};

export const unlikePost = (post) => async (dispatch) => {
    try {   
        console.log("unlike action with post"+post.author);
        const res = await userService.unlikePost(post);
        // dispatch({
        //     type: constants.POSTS_UNLIKE_POST_SUCCESS,
        //     payload: res,
        // });
    } catch (error) {
        console.log("unlike error");
    }
};

export const changeProfileImg = (profileImg) => async (dispatch) => {
    try {   
        console.log("change prof action with img"+profileImg);
        const res = await userService.updateProfileImg(profileImg);
        dispatch({
            type: constants.UPDATE_PROFILE_PICTURE_REQUEST,
            payload: profileImg,
        });
    } catch (error) {
        console.log("update error");
    }
};

export const createPost = (message,img) => async (dispatch) => {
    try {   
        console.log("change prof action with img"+message+img);
        const res = await userService.createPost(message,img);
        dispatch({
            type: constants.POSTS_CREATE_POST_SUCCESS,
            payload: res,
        });
    } catch (error) {
        console.log("create post error");
    }
};

export const updateAccount = (User) => async (dispatch) => {
    try {
      console.log("updateAccount action");
      dispatch({ type: constants.UPDATE_ACCOUNT_INFO_REQUEST });
      const res = await userService.update(User);
      console.log("output from update user action: " + res);
      dispatch({
        type: constants.UPDATE_ACCOUNT_INFO_SUCCESS,
        payload: res,
      });
    } catch (e) {
      console.log("catch error user action: " + e);
      dispatch({
        type: constants.UPDATE_ACCOUNT_INFO_FAILURE,
      });
    }
  };
  
