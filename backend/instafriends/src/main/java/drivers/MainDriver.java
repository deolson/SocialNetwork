package drivers;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import controllers.UserController;
import models.Post;
import models.User;
import services.Interfaces.PostService;
import services.Interfaces.UserService;

public class MainDriver {
	
	private static ApplicationContext appContext =
			new ClassPathXmlApplicationContext("applicationContext.xml");
	
	public static UserService userService = appContext.getBean("userService",UserService.class);
	public static PostService postService = appContext.getBean("postService",PostService.class);


    public static void main(String[] args) {
    	
         insertInitialValues();

        // postService.deleteUserPosts(userService.selectById(1));
//        userService.deleteUser(userService.selectById(1));
//         postService.deletePost(postService.selectById(4));
        // System.out.println(postService.selectById(2));
        // System.out.println(userService.selectById(1));
         //postService.unlikePost(postService.selectById(1),userService.selectById(1));
		////////SELECT BY ID
		System.out.println("\n\nNOW SELECTING USER BY ID");
		System.out.println(userService.selectById(1));
//
        System.out.println("\n\nNOW SELECTING ALL USERS");
		System.out.println(userService.selectAll());
		
		System.out.println("\n\n---------------------GETTING ALL USERS-------------------\n");
		System.out.println(userService.allUserInfo());
		
		System.out.println("\n\n---------------------GET Post by ID-------------------\n");
		System.out.println(postService.selectById(4));
	
		
	// 	// ////////////SELECT ALL VILLS
    //     System.out.println("\n\nNOW SELECTING ALL POSTS");
	// 	System.out.println(postService.selectAll());

	// 	System.out.println("\n\nNOW SELECTING DAVID 1 POSTS");
	// 	System.out.println(postService.selectById(1));

    //    System.out.println("\n\nNOW SELECTING LOGIN");
	// 	System.out.println(userService.loginUser("davidusername", "passwor"));

    }

    private static void insertInitialValues() {

        //Users
        User david = new User("davidusername", "password", "David","Olson", "david.olson@revature.net","chillhound.png");
        User tayaba = new User("tayabausername", "password", "Tayaba","Jamal", "tayaba.jamal@revature.net", "angry dog.jpg");
        User zubair = new User("zubairusername", "password", "Zubair","Ahmed", "zubair.ahmed@revature.net", "dolphin.jpg");
        User miguel = new User("miguelusername", "password", "Miguel","Leon", "miguel.leon@revature.net", "chillhound.png");
        
        userService.createUser(david);
        userService.createUser(tayaba);
        userService.createUser(zubair);
        userService.createUser(miguel);

        //Posts
        Post bothImgMsg = new Post(david, "http://placekitten.com/200/300?image=1",
        		"david's post message really long message to so how this displays on the screen when a user types a lot of information to share cats with the world and just wont stop cant stop typing ");
        Post imgPost = new Post("http://placekitten.com/400/400?image=2", david);
        Post msgPost = new Post(david, "david's post message");
        postService.createPost(bothImgMsg);
        postService.createPost(imgPost);
        postService.createPost(msgPost);
        
        Post bothImgMsgTayaba = new Post(tayaba, "http://placekitten.com/200/300?image=3", "tayaba's post message");
        Post imgPostTayaba = new Post("http://placekitten.com/100/100?image=4", tayaba);
        Post msgPostTayaba = new Post(tayaba, "tayaba's post message");
        postService.createPost(bothImgMsgTayaba);
        postService.createPost(imgPostTayaba);
        postService.createPost(msgPostTayaba);

        Post bothImgMsgZubair = new Post(zubair, "http://placekitten.com/200/300?image=5", "zubair's post message");
        Post imgPostZubair = new Post("http://placekitten.com/200/300?image=6", zubair);
        Post msgPostZubair = new Post(zubair, "zubair's post message");
        postService.createPost(bothImgMsgZubair);
        postService.createPost(imgPostZubair);
        postService.createPost(msgPostZubair);

        Post bothImgMsgMiguel = new Post(miguel, "http://placekitten.com/200/300?image=7", "miguel's post message");
        Post imgPostMiguel = new Post("http://placekitten.com/200/300?image=8", miguel);
        Post msgPostMiguel = new Post(miguel, "miguel's post message");
        postService.createPost(bothImgMsgMiguel);
        postService.createPost(imgPostMiguel);
        postService.createPost(msgPostMiguel);


        postService.likePost(bothImgMsg, tayaba);
        postService.likePost(imgPost, tayaba);
        postService.likePost(msgPost, tayaba);

        postService.likePost(bothImgMsg, david);
        postService.likePost(bothImgMsgZubair, david);
        postService.likePost(bothImgMsgMiguel, david);

        postService.likePost(bothImgMsgZubair, zubair);
        postService.likePost(bothImgMsgMiguel, zubair);
        postService.likePost(bothImgMsgTayaba, zubair);

        postService.likePost(imgPostTayaba, miguel);
        postService.likePost(imgPostZubair, miguel);
        postService.likePost(imgPostMiguel, miguel);


        System.out.println("\n\n\n\n\n ENDING INIT");

    }
    
}
