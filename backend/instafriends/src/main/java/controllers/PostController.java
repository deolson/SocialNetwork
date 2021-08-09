package controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import models.Post;
import models.User;
import services.Interfaces.PostService;

@RestController
@RequestMapping(value="/post")
@CrossOrigin(origins="http://localhost:3000" , allowCredentials="true")
public class PostController {
    
    private PostService postService;

    @Autowired
	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping(value="/allPosts")
    public List<Post> allPosts(){
		List<Post> allPosts = new ArrayList<>();
		allPosts = postService.selectAll();
		System.out.println(allPosts);
    	return allPosts;
    }
	
	@PostMapping(value="/like")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Post likingPost(HttpSession session, @RequestBody Post postToLike) {
		
		int postId = postToLike.getPostId();
		System.out.println("postId: >>>>"+postToLike);
		
		Post thisPost = postService.selectById(postId);
		System.out.println(thisPost);
		
		
		User userLiking = new User();
		userLiking = (User)session.getAttribute("validatedUser");
		System.out.println(userLiking);
		
		
		boolean status = postService.likePost(thisPost, userLiking);
		
		if(status) {
			System.out.println("Post was liked");
			Post updated = postService.selectById(postId);
			return updated;
		
		} else {
			System.out.println("Like unsuccessful");
			return thisPost;
		}
	}
	
	@PostMapping(value="/unlike")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Post unlikingPost(HttpSession session, @RequestBody Post postToUnLike) {
		
		int postId = postToUnLike.getPostId();
		System.out.println("postId: >>>>"+postToUnLike);
		
		Post thisPost = postService.selectById(postId);
		System.out.println(thisPost);
		
		User userUnLiking = (User)session.getAttribute("validatedUser");
		System.out.println(userUnLiking);
		
		
		boolean status = postService.unlikePost(thisPost, userUnLiking);
		
		if(status) {
			System.out.println("Post was unliked");
			Post updated = postService.selectById(postId);
			return updated;
		} else {
			System.out.println("unLike unsuccessful");
			return thisPost;
		}
	}
	
	@PostMapping(value="/createPost")
	public Post createPost(HttpSession session,@RequestBody Post partialPost) {
		
		Post newPost = new Post();
		newPost.setAuthor((User)session.getAttribute("validatedUser"));
		if(partialPost.getMessage() == null) {
			newPost.setImgURL(partialPost.getImgURL());
		} else if(partialPost.getImgURL() == null) {
			newPost.setMessage(partialPost.getMessage());
		} else {
			newPost.setMessage(partialPost.getMessage());
			newPost.setImgURL(partialPost.getImgURL());
		}
		
		return postService.createPost(newPost);
	}

}
