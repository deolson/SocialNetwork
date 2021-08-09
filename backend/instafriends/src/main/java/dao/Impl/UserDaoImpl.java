package dao.Impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import dao.Interfaces.UserDao;
import models.User;

@Repository("userDao")
public class UserDaoImpl implements UserDao{

	private SessionFactory sesFact;
	
	@Autowired
	public UserDaoImpl(SessionFactory sesFact) {
		this.sesFact = sesFact;
	}
	
    @Override
    public User createUser(User user) {		
			user.setUserId((Integer)sesFact.getCurrentSession().save(user));
			return user;
    }

    @Override
    public boolean updateUser(User user) {
		try {
			sesFact.getCurrentSession().update(user);
			return true;
		} catch (Exception e) {
			return false;
		}
    }

    @Override
    public boolean deleteUser(User user) {
		try {
			sesFact.getCurrentSession().delete(user);
			return true;
		} catch (Exception e) {
			return false;
		}
    }

    @Override
    public User selectById(int id) {
		List<User> user = sesFact.getCurrentSession().createQuery("FROM User u WHERE u.userId = :userId", User.class)
		.setParameter("userId",id)
		.list();

		if(user.size() == 1){
			return user.get(0);
		}
		return null;
    }

    @Override
    public List<User> selectAll() {
		List<User> allUsers = sesFact.getCurrentSession().createQuery("FROM User", User.class).list();
		return allUsers;
    }
    
    @Override
	public User selectByUsername(String username) {
		List<User> userQuery = sesFact.getCurrentSession().createQuery("FROM User U WHERE U.username = :username", User.class)
			.setParameter("username", username).list();
	
		if(userQuery.size() > 1 || userQuery.size() == 0)
			return null;
		return userQuery.get(0);
	}
    
    @Override
	public User validateByUsername(String username) {
    	
    	
    	List<Object[]> userQuery = sesFact.getCurrentSession().createQuery("SELECT U.username, U.password, U.firstname, U.lastname, U.email "
    			+ "FROM User U WHERE U.username = :username").setParameter("username", username).getResultList();
    	
    	if(userQuery.size() > 1 || userQuery.size() == 0) {
    		
    		return null;
    	} 
    		Object[] o = userQuery.get(0);
    		username = (String) o[0];
			String password = (String) o[1];
			String firstname = (String) o[2];
			String lastname = (String) o[3];
			String email = (String) o[4];
			
			User user = new User(username,password,firstname,lastname,email);
			return user;
    	
	}
    

	@Override
	public List<User> getAllUsers() {
		List<User> allUsersInfo = new ArrayList<>();
		String queryString = "SELECT U.username, U.password, U.firstname, U.lastname, U.email FROM User U";
		List<Object[]> results = sesFact.getCurrentSession().createQuery(queryString).getResultList();
		for(int i = 0; i<results.size();i++) {
			
			Object[] o = results.get(i);
			String username = (String) o[0];
			String password = (String) o[1];
			String firstname = (String) o[2];
			String lastname = (String) o[3];
			String email = (String) o[4];
			
			User user = new User(username,password,firstname,lastname,email);
			allUsersInfo.add(user);
			
		}
		return allUsersInfo;
	}

	
    
}
