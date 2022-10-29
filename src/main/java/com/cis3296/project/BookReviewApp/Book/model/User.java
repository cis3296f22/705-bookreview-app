package com.cis3296.project.BookReviewApp.Book.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "userId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(name = "userName")
    private String userName;

    @Column(name = "password")
    /** uncomment for password encryption. might break code**/
//    @Convert(converter = AesEncryptor.class)
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "age")
    private String age;

    /** a user can leave many reviews **/
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL) // a user can leave many reviews
    private List<Review> reviews;

    /**  getters and setters replaced with lombok annotations **/

//    public void setReviews(List<Review> reviews) {
//        this.reviews = reviews;
//    }
//
//    public void setUserId(long userId) {
//        this.userId = userId;
//    }
//
//    public String getUserName() {
//        return userName;
//    }
//
//    public void setUserName(String userName) {
//        this.userName = userName;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getAge() {
//        return age;
//    }
//
//    public void setAge(String age) {
//        this.age = age;
//    }
//
//    public long getUserId() {
//        return userId;
//    }
//
//    public List<Review> getReviews() {
//        return reviews;
//    }
}
