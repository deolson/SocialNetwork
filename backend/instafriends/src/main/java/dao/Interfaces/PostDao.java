package dao.Interfaces;

import java.util.List;

import models.Post;
import models.User;

public interface PostDao {
	
    public Post createPost(Post post);
    public boolean updatePost(Post post);
    public boolean deletePost(Post post);
	
	public Post selectById(int id);
	public List<Post> selectAll();

    public void deleteUserPosts(User user);

}
