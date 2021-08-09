package services.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dao.Interfaces.PostDao;
import models.Post;
import models.User;
import services.Interfaces.PostService;

@Transactional
@Service("postService")
public class PostServiceImpl implements PostService {

    @Autowired
    private PostDao postDao;
    
    public PostServiceImpl(PostDao postDao) {
		this.postDao = postDao;
	}
    
    public PostServiceImpl() {}

    @Override
    public Post selectById(int id) {
		Post post = postDao.selectById(id);
        return post;
    }

    @Override
    public List<Post> selectAll() {
        return postDao.selectAll();
    }

	@Override
	public Post createPost(Post post) {
		post.getAuthor().getPosts().add(post);
		return postDao.createPost(post);
	}

	@Override
	public boolean updatePost(Post post) {
		return postDao.updatePost(post);
	}

	@Override
	public boolean deletePost(Post post) {
		post.getAuthor().getPosts().remove(post);
		return postDao.deletePost(post);
		
	}

	@Override
    public boolean likePost(Post post, User user) {
		System.out.println("\n get Liked posts of user: "+user.getLikedPosts());
        user.getLikedPosts().add(post);
        post.getLikes().add(user);
        return postDao.updatePost(post);
    }

    @Override
    public boolean unlikePost(Post post, User user) {
        user.getLikedPosts().remove(post);
        post.getLikes().remove(user);
        return postDao.updatePost(post);
    }

    public void deleteUserPosts(User user) {
        postDao.deleteUserPosts(user);
    }
    
}
