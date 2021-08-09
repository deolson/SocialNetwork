import { constants } from "./actionTypes";

const loginInitialState = {
    isRegistering: false,
    registered: false,
    isLoggedIn: false,
    loggingIn: false,
    user: {},
};

const userInitialState = {
    usersLoading: false,
    usersLoaded: false,
    users: [],
};

const postInitialState = {
    postsLoading: false,
    postsLoaded: false,
    posts: [],
};

export const loginReducer = (state = loginInitialState, action) => {
    console.log("in loginreducer" + action.type);
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
            };
        case constants.LOGIN_SUCCESS:
            console.log("in sucess reducer" + action.payload);
            return {
                ...state,
                user: action.payload, // this is what we expect to get back from API call and login page input
                isLoggedIn: true,
                loggingIn: false,
            };
        case constants.LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loggingIn: false,
            };
        case constants.REGISTER_REQUEST:
            return {
                ...state,
                isRegistering: true,
            };
        case constants.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                registered: true,
            };
        case constants.REGISTER_FAILURE:
            return {
                ...state,
                isRegistering: false,
                registered: false,
            };
        case constants.LOGOUT:
            return {
                ...state,
                isRegistering: false,
                registered: false,
                isLoggedIn: false,
                loggingIn: false,
                user: {},
            };
        case constants.UPDATE_PROFILE_PICTURE_REQUEST:
            return {
                ...state,
                user: { ...state.user, profileImg: action.payload },
            };
        case constants.UPDATE_ACCOUNT_INFO_REQUEST:
            return {
                ...state,
                isUpdating: true,
            };
        case constants.UPDATE_ACCOUNT_INFO_SUCCESS:
            return {
                ...state,
                updated: true,
            };
        case constants.UPDATE_ACCOUNT_INFO_FAILURE:
            return {
                ...state,
                isUpdating: false,
                updated: false,
            };

        default:
            return state;
    }
};

export const usersReducer = (state = userInitialState, action) => {
    console.log("in userreducer" + action);
    switch (action.type) {
        case constants.USERS_GETALL_REQUEST:
            return {
                ...state,
                usersLoading: true,
            };
        case constants.USERS_GETALL_SUCCESS:
            return {
                ...state,
                users: action.payload,
                usersLoading: false,
                usersLoaded: true,
            };
        case constants.USERS_GETALL_FAILURE:
            return {
                ...state,
                usersLoading: false,
            };
        case constants.LOGOUT:
            return {
                ...state,
                usersLoading: false,
                usersLoaded: false,
                users: [],
            };
        default:
            return state;
    }
};

export const postReducer = (state = postInitialState, action) => {
    console.log("in postreducer" + action);
    switch (action.type) {
        case constants.POSTS_GETALL_REQUEST:
            return {
                ...state,
                postsLoading: true,
            };
        case constants.POSTS_GETALL_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                postsLoading: false,
                postsLoaded: true,
            };
        case constants.POSTS_GETALL_FAILURE:
            return {
                ...state,
                postsLoading: false,
            };
        case constants.LOGOUT:
            return {
                ...state,
                postsLoading: false,
                postsLoaded: false,
                posts: [],
            };
        case constants.POSTS_CREATE_POST_SUCCESS:
            return {
                ...state,
                // postsLoading: false,
                // postsLoaded: false,
                // posts: [],
            };
        default:
            return state;
    }
};
