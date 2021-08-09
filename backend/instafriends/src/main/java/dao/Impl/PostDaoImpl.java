package dao.Impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dao.Interfaces.PostDao;
import models.Post;
import models.User;

@Repository("postDao")
public class PostDaoImpl implements PostDao {

    private SessionFactory sesFact;

    @Autowired
    public PostDaoImpl(SessionFactory sesFact) {
       this.sesFact = sesFact;
    }

    @Override
    public Post createPost(Post post) {
        post.setPostId((Integer)sesFact.getCurrentSession().save(post));
        return post;
    }

    @Override
    public boolean updatePost(Post post) {
		try {
            sesFact.getCurrentSession().update(post);
            return true;
        } catch (Exception e) {
            return false;
        }    
    }

    @Override
    public boolean deletePost(Post post) {
        try {
		    sesFact.getCurrentSession().delete(post);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Post selectById(int id) {
		    Post post = sesFact.getCurrentSession().get(Post.class, id);
        return post;
    }

    @Override
    public List<Post> selectAll() {
		    List<Post> allPosts = sesFact.getCurrentSession().createQuery("from Post", Post.class).list();		
		    return allPosts;
    }

    public void deleteUserPosts(User user) {
        sesFact.getCurrentSession().createQuery("DELETE FROM Post WHERE userid = :id")
            .setParameter("id", user.getUserId())
            .executeUpdate();
    }

}
