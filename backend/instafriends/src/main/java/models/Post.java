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
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "PostTable")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postId")
    private int postId;
    
    @Column(name = "imgURL")
    private String imgURL;
    
    @Column(name = "message")
    private String message;

    //@JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId", nullable=false)
    private User author;
    
    //@JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "post_like",
        joinColumns = @JoinColumn(name = "postId"),
        inverseJoinColumns = @JoinColumn(name = "userId")
	)
    private Set<User> likes = new HashSet<User>();

    public Post(int postId, User author, String imgURL, String message, Set<User> likes) {
        this.postId = postId;
        this.author = author;
        this.imgURL = imgURL;
        this.message = message;
        this.likes = likes;
    }
    
    public Post(User author, String imgURL, String message, Set<User> likes) {
        this.author = author;
        this.imgURL = imgURL;
        this.message = message;
        this.likes = likes;
    }

    public Post(User author, String imgURL, String message) {
        this.author = author;
        this.imgURL = imgURL;
        this.message = message;
    }

    public Post(String imgURL, User author) {
        this.author = author;
        this.imgURL = imgURL;
    }

    public Post(User author, String message) {
        this.author = author;
        this.message = message;
    }
    
    public Post(int postId, String imgURL, String message) {
		super();
		this.postId = postId;
		this.imgURL = imgURL;
		this.message = message;
	}
    
    public Post(String imgURL, String message) {
		this.imgURL = imgURL;
		this.message = message;
	}

	public Post() {}

    public int getPostId() {
        return this.postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getImgURL() {
        return this.imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getAuthor() {
        return this.author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public Set<User> getLikes() {
        return this.likes;
    }

    public void setLikes(Set<User> likes) {
        this.likes = likes;
    }

    public String printWhoLiked(){
        String start = "{";
        for (User user : this.likes) {
            start += user.getUsername()+",";
        }
        return start+"}";
    }

    @Override
    public String toString() {
        return "\n{" +
            " postId='" + getPostId() + "'" +
            ", imgURL='" + getImgURL() + "'" +
            ", message='" + getMessage() + "'" +
            ", author='" + getAuthor().getUsername() + "'" +
            ", likes='" + printWhoLiked() + "'" +
            "}";
    }

	@Override
    public int hashCode() {
        return Objects.hashCode(postId);
    }
 
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
			Post other = (Post) obj;
        return Objects.equals(postId, other.getPostId());
    }

}
