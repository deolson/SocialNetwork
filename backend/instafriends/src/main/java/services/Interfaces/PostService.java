package services.Interfaces;

import java.util.List;



import models.Post;
import models.User;


public interface PostService {
	
    public Post createPost(Post post);
    public boolean updatePost(Post post);
    public boolean deletePost(Post post);

    public boolean likePost(Post post, User user);
	public boolean unlikePost(Post post, User user);
    
	public Post selectById(int id);
	public List<Post> selectAll();

    public void deleteUserPosts(User user);
    
}
