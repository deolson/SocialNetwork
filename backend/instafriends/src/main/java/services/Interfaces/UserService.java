package services.Interfaces;

import java.util.List;



import models.User;


public interface UserService {
    
    public User createUser(User user);
	public boolean updateUser(User user);
	public boolean deleteUser(User user);

	public User loginUser(String username, String password); 
	public User selectByUsername(String username);
	//public User validateByUsername(String username);
	
	public User selectById(int id);
	public List<User> selectAll();
	public List<User> allUserInfo();
	public boolean getPassword(String userName);

}
