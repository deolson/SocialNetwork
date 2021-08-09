package models;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="UserTable")
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="userId")
	private int userId;
	
	@Column(name="username", unique=true, nullable=false)
	private String username;
	
	@Column(name="password", nullable=false)
	private String password;

	@Column(name="firstname", nullable=false)
	private String firstname;
	
	@Column(name="lastname", nullable=false)
	private String lastname;
	
	@Column(name="email", unique=true, nullable=false)
	private String email;
	
	@Column(name="profileImg")
	private String profileImg = "defaultImgUrl";
	
	@JsonIgnore
	@OneToMany(mappedBy="author", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Post> posts;

    @JsonIgnore
	@ManyToMany(mappedBy = "likes", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST} ,fetch = FetchType.EAGER)
	private Set<Post> likedPosts;
	
    
	public User(int userId, String username, String password, String firstname, String lastname, String email,
			String profileImg, Set<Post> likedPosts, Set<Post> posts) {
		
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.profileImg = profileImg;
		this.likedPosts = likedPosts;
		this.posts = posts;
	}

	public User(String username, String password, String firstname, String lastname, String email,
	String profileImg, Set<Post> likedPosts, Set<Post> posts) {

		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.profileImg = profileImg;
		this.likedPosts = likedPosts;
		this.posts = posts;
	}
	
	public User(String username, String password, String firstname, String lastname, String email, String profileImg) {
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		likedPosts = new HashSet<Post>();
		posts = new HashSet<Post>();
		this.profileImg = profileImg;
	}

	public User(String username, String password, String firstname, String lastname, String email) {

		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		likedPosts = new HashSet<Post>();
		posts = new HashSet<Post>();
	}

	public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public User() {

	}

	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstname() {
		return this.firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return this.lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProfileImg() {
		return this.profileImg;
	}

	public void setProfileImg(String profileImg) {
		this.profileImg = profileImg;
	}

	public Set<Post> getPosts() {
		return this.posts;
	}

	public void setPosts(Set<Post> posts) {
		this.posts = posts;
	}

	public Set<Post> getLikedPosts() {
		return this.likedPosts;
	}

	public void setLikedPosts(Set<Post> likedPosts) {
		this.likedPosts = likedPosts;
	}

	@Override
	public String toString() {
		return "\n{" +
			" userId='" + getUserId() + "'" +
			", username='" + getUsername() + "'" +
			", password='" + getPassword() + "'" +
			", firstname='" + getFirstname() + "'" +
			", lastname='" + getLastname() + "'" +
			", email='" + getEmail() + "'" +
			", profileImg='" + getProfileImg() + "'" +
			//", \n\tlikedPosts='" + getLikedPosts() + "'" +
			//", \n\tposts='" + getPosts() + "'" +
			"}";
	}

	@Override
    public int hashCode() {
        return Objects.hashCode(userId);
    }
 
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
			User other = (User) obj;
        return Objects.equals(userId, other.getUserId());
    }
	
}
