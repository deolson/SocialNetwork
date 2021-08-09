package services.Impl;

import java.util.List;
import java.util.Random;

import org.jasypt.util.password.BasicPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dao.Interfaces.PostDao;
import dao.Interfaces.UserDao;
import models.Post;
import models.User;

import services.Interfaces.UserService;
import util.Email;

@Transactional
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private PostDao postDao;
    
    public UserServiceImpl(UserDao userDao) {
		this.userDao = userDao;
	}
    
    public UserServiceImpl() {}
 

    @Override
    public User createUser(User user) {
        BasicPasswordEncryptor passwordEncryptor = new BasicPasswordEncryptor();
        String encryptedPassword = passwordEncryptor.encryptPassword(user.getPassword());
        user.setPassword(encryptedPassword);
        return userDao.createUser(user);
    }

    @Override
    public boolean updateUser(User user) {
        return userDao.updateUser(user);
    }

    @Override
    public boolean deleteUser(User user) {
        for (Post post : user.getLikedPosts()) {
            post.getLikes().remove(user);
            postDao.updatePost(post);
        }
        user.getLikedPosts().clear();
        return userDao.deleteUser(user);
    }

    @Override
    public User selectById(int id) {
        return userDao.selectById(id);
    }

    @Override
    public List<User> selectAll() {
        return userDao.selectAll();
    }

	@Override
	public User loginUser(String username, String password) {
		System.out.println("\n---------INSIDE LoginUser------------");
        BasicPasswordEncryptor passwordEncryptor = new BasicPasswordEncryptor();
        User potentialUser = userDao.selectByUsername(username);
        //System.out.println("potential User inside loginUser: "+potentialUser);
        
        if(potentialUser==null) {
        	 return null;
        }else {
        	Boolean passStatus = passwordEncryptor.checkPassword(password, potentialUser.getPassword());
        	System.out.println("\npassword Status: "+passStatus);
        	if (passStatus)
                return userDao.validateByUsername(username);
        	else
        		return new User(null,null); ///ADD LOGIC TO NOTIFY EXISTING USER OF INCORRECT PASSWORD
        }
           
	}
	
	public PostDao getPostDao() {
		return postDao;
	}

	public void setPostDao(PostDao postDao) {
		this.postDao = postDao;
	}

	@Override
	public List<User> allUserInfo() {
		// TODO Auto-generated method stub
		return userDao.getAllUsers();
	}

	@Override
	public User selectByUsername(String username) {
		return userDao.selectByUsername(username);
	}

	public boolean getPassword(String userName) {


	    // Create a string of uppercase and lowercase characters and numbers
		
	    String upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    String lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
	    String numbers = "0123456789";

	    // Combine all strings
	    String alphaNumeric = upperAlphabet + lowerAlphabet + numbers;

	    // Create random string builder
	    StringBuilder sb = new StringBuilder();

	    // Create an object of Random class
	    Random random = new Random();

	    // Specify length of random string
	    int length = 10;

	    for(int i = 0; i < length; i++) {

	      // Generate random index number
	      int index = random.nextInt(alphaNumeric.length());

	      // Get character specified by index from the string
	      char randomChar = alphaNumeric.charAt(index);

	      // Append the character to string builder
	      sb.append(randomChar);
	    }

	    String randomString = sb.toString();
	    
	   
	    
////////////---------Geting user by user name-------------
		
		
		
		System.out.println(userName);
        User user=userDao.selectByUsername(userName);
        String email= user.getEmail();
        

        
//==================== Sending E-Mail with new password===========================     	
    	try {
			Email.sendMail(email, randomString);
		} catch (Exception e) {
			e.printStackTrace();
		}
      
///////////-----------Hashing Password ------------------
        BasicPasswordEncryptor passwordEncryptor = new BasicPasswordEncryptor();
        String encryptedPassword = passwordEncryptor.encryptPassword(randomString);
        user.setPassword(encryptedPassword);
    	
    	
///////////-----------Updating Password in data base------------------
        
    
        
        if(userDao.updateUser(user)) {
        	

        	return true;
        }
		return false;
	}


    
	
	
}
