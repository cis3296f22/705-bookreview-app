package com.cis3296.project.BookReviewApp.service;

import com.cis3296.project.BookReviewApp.model.User;
import com.cis3296.project.BookReviewApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    /** Creating a New User **/
    public String createUser(User user) {
        userRepository.save(user);
        return String.format("Welcome %s!", user.getUserName());
    }


    /** Checks If User Already Exists **/
    public boolean containsDuplicate(String userName, String email){
        List<User> allUsers = userRepository.findAll();
        boolean duplicateUserName = allUsers.stream().filter(o -> o.getUserName().equals(userName)).findFirst().isPresent();
        boolean duplicateUserEmail = allUsers.stream().filter(o -> o.getEmail().equals(email)).findFirst().isPresent();
        return (duplicateUserName || duplicateUserEmail);
    }

    /** Deleting a User **/
    @Transactional
    public String deleteUser(String userName) {
        List<User> allUsers = userRepository.findAll();
        boolean containsUserName = allUsers.stream().filter(o -> o.getUserName().equals(userName)).findFirst().isPresent();
        if (containsUserName == true) {
            userRepository.deleteByUserName(userName);
            return String.format("User %s Has Been Successfully Deleted", userName);
        }
        return String.format("User %s Does Not Exist", userName);
    }

    /** find a user **/
    public User findUser(String userName) {
        return userRepository.findByUserName(userName);
    }

    /** find all users **/
    public List<User> findAllUser() {
        return userRepository.findAll();
    }
}
