import axios from "axios";

export const userService = {
    login,
    forgotPassword,
    updateProfileImg,
    likePost,
    unlikePost,
    register,
    getAllPosts,
    getAllUsers,
    createPost,
    update,
};

const instance = axios.create({
  withCredentials: true
})

async function login(username, password) {
    console.log("in service login:username " + username);

    const response = await instance.post(
        `http://localhost:9002/instafriends/api/user/login` ,
        {
            username: username,
            password: password
        }
    );
    const axiosData = response.data;
    console.log(axiosData);
    if(axiosData.username != null) {
        return axiosData;
    }
    throw new Error("Incorrect Password");
}

async function forgotPassword(username) {
    console.log("in service forgotPassword:username " + username);

    instance.post(
        `http://localhost:9002/instafriends/api/user/updatePassword`,
        {
            username: username,
            password: ""
        }
    );
}

async function register(User) {
    console.log("in service login:username " + User.username);

    const response = await instance.post(
        `http://localhost:9002/instafriends/api/user/register` ,
        {
            username: User.username,
            password: User.password,
            firstname: User.firstname,
            lastname: User.lastname,
            email: User.email,
        }
    );
    const axiosData = response.data;
    console.log(axiosData);
    if(axiosData.username != null) {
        return axiosData;
    }
    throw new Error("Unable to Create Account");
}

async function getAllPosts() {
    console.log("in service getAllPosts");

    const response = await instance.get(
        `http://localhost:9002/instafriends/api/post/allPosts` 
    );
    const axiosData = response.data;
    console.log(axiosData);
    if(axiosData != null) {
        return axiosData;
    }
    throw new Error("No Posts Returned");
}

async function getAllUsers() {
    console.log("in service getallusers");
    const response = await instance.get(
        `http://localhost:9002/instafriends/api/user/allUsers` 
    );
    const axiosData = response.data;
    console.log(axiosData);
    if(axiosData != null) {
        return axiosData;
    }
    throw new Error("No Posts Returned");
}

async function likePost(post) {
    console.log("in service like post");
    const response = await instance.post(
        `http://localhost:9002/instafriends/api/post/like`,
        {
            postId: post.postId,
            author: post.author,
            imgURL: post.imgURL,
            message: post.message,
            likes: post.likes,
        } 
    );
    const axiosData = response.data;
    console.log("like Axios data"+axiosData);
    if(axiosData != null) {
        return axiosData;
    }
    throw new Error("Couldn't Like Post");
}

async function unlikePost(post) {
    console.log("in service unlike post with"+post);
    const response = await instance.post(
        `http://localhost:9002/instafriends/api/post/unlike`, 
        {
            postId: post.postId,
            author: post.author,
            imgURL: post.imgURL,
            message: post.message,
            likes: post.likes,
        } 
    );
    const axiosData = response.data;
    console.log("Data"+axiosData);
    if(axiosData != null) {
        return axiosData;
    }
    throw new Error("Couldn't unLike Post");
}

async function updateProfileImg(profileImg) {
    console.log("posting profile");
    const response = await instance.post(
        `http://localhost:9002/instafriends/api/user/updateProfileImg`, 
        {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
            profileImg: profileImg
        } 
    );
    const axiosData = response.data;
    console.log("Data"+axiosData);
    if(axiosData != null) {
        return axiosData;
    }
    throw new Error("Couldn't updateprofileimg Post");
}

async function createPost(message,img) {
    console.log("in service createPost");
    
    const response = await instance.post(
        `http://localhost:9002/instafriends/api/post/createPost` ,
        {
            imgURL: img,
            message: message,
        }
    );
    const axiosData = response.data;
    console.log(axiosData);
    if(axiosData != null) {
        return axiosData;
    }
    throw new Error("Unable to Create Account");
}

async function update(User) {
    console.log("in service Update:username " + User.userId);
  
    const response = await instance.post(
      `http://localhost:9002/instafriends/api/user/updateUser`,
      {
        userId: User.userId,
        username: User.username,
        password: User.password,
        firstname: User.firstname,
        lastname: User.lastname,
        email: User.email,
      }
    );
    const axiosData = response.data;
    console.log(axiosData);
    if (axiosData.userId != null) {
      return axiosData;
    }
    throw new Error("Unable to Update");
  }
  