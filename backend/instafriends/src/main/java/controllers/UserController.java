package controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.jasypt.util.password.BasicPasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import models.User;
import services.Interfaces.UserService;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins="http://localhost:3000" , allowCredentials="true")
public class UserController {
    
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	private void badLogin(){
		
	}
	
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PostMapping(value="/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public User register(HttpSession session, @RequestBody User newUser) {
    	System.out.println("<<<<<<<<<<< REGISTERING A NEW USER >>>>>>>>>>>>");
    	System.out.println("Entered Information: "+newUser);
    	
    	User addedUser = userService.createUser(newUser);
    	System.out.println("USER WAS CREATED: "+addedUser);
    	
    	return addedUser;
    }

    @PostMapping(value = "/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public User login(HttpSession session, @RequestBody User partialUser){
//    	session.setAttribute("currentUser", partialUser);
    	System.out.println(session.getId());
    	
    	
    	System.out.println("THIS IS OUR USER LOGIN INPUT : "+partialUser);
    	
    	String username = partialUser.getUsername();
    	System.out.println("Username enterd: "+username);
    	String password = partialUser.getPassword();
    	System.out.println("Password enterd: "+password);
    	
    	User validatedUser = userService.loginUser(username, password);
    	//System.out.println(validatedUser==null);
    	//System.out.println(validatedUser);
    	
    	User loggedInUser = userService.selectByUsername(username);
    	
    	
    	if(validatedUser==null) {
    		System.out.println("<<<<<<<<<<User DOES NOT Exist>>>>>>>>>");
    		badLogin();
    		return null;
    	}else if(validatedUser.getUsername()==null){
    		System.out.println("<<<<<<<<<<User Exists but Incorrect Password>>>>>>>>>");
    		return null;
    	}else {
    		System.out.println("<<<<<<<<<<User Exists>>>>>>>>>");
    		System.out.println("\n Logged In User by username: \n"+loggedInUser);
    		session.setAttribute("validatedUser", loggedInUser);
    		return loggedInUser;
    	}
    	
    }
   

    @GetMapping(value="/logout")
    public String logout(HttpSession session){
    	System.out.println("------LOGGING OUT------");
        session.invalidate();
        return null;
    }
    
    @GetMapping(value="/getCurrentUser")
    public User getCurrentUser(HttpSession session){
    	User currentUser = (User)session.getAttribute("validatedUser");
    	System.out.println("\n\n\nlogged in user: "+currentUser);
    	
        return currentUser;
        
    }
    
    @GetMapping(value="/allUsers")
    public @ResponseBody List<User> allUsers(){
    	List<User> allUsers = new ArrayList<>();
    	allUsers = userService.selectAll();
    	return allUsers;
    }

    @PostMapping(value="/updatePassword")
    public Boolean updatePassword(@RequestBody User user){
    	
    	if(userService.getPassword(user.getUsername())) {
    	return true;
    }
    	return false;
    }
    
    @PostMapping(value="/updateProfileImg")
    public User updateProfilePic(HttpSession session, @RequestBody User partialUser){
    	
    	System.out.println("in update profile");
    	User userLiking = (User)session.getAttribute("validatedUser");
    	userLiking.setProfileImg(partialUser.getProfileImg());
    	userService.updateUser(userLiking);
		System.out.println(userLiking);
		return userLiking;
    
    }
    
	@PostMapping(value = "/updateUser")
	public User updateUser(HttpSession session, @RequestBody User updatedUser) {
///Selecting user by ID in order to update any fields 
		System.out.println("Change info request: " + updatedUser);

		//User thisUser = userService.selectByUsername(updatedUser.getUsername());
		User thisUser = userService.selectById(updatedUser.getUserId());
		System.out.println("\n User Info From DB: " + thisUser);

		String passFromform = updatedUser.getPassword();
		System.out.println(passFromform);

		thisUser.setFirstname(updatedUser.getFirstname());
		thisUser.setLastname(updatedUser.getLastname());
		thisUser.setUsername(updatedUser.getUsername());
		thisUser.setEmail(updatedUser.getEmail());

		if (passFromform.equals("")) {
			System.out.println("User did not change password");
		} else {
			BasicPasswordEncryptor passwordEncryptor = new BasicPasswordEncryptor();
			String encryptedPassword = passwordEncryptor.encryptPassword(passFromform);
			thisUser.setPassword(encryptedPassword);
			System.out.println("New password was set");
		}
		userService.updateUser(thisUser);
		System.out.println("UPDATED:>>>>> "+thisUser);
		return thisUser;
	}


}
