package com.cis3296.project.BookReviewApp.Book.controller;

import com.cis3296.project.BookReviewApp.Book.service.UserService;
import com.cis3296.project.BookReviewApp.Book.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    /** Creating a New User **/
    @PostMapping("/create")
    public String createUser(@RequestBody User user) {
        boolean userExists = userService.containsDuplicate(user.getUserName(), user.getEmail());
        return userExists == true ? "This User Has An Existing Account" : userService.createUser(user);
    }

    /** Not sure what situation we would need to look up a user. maybe in settings in order to change something? **/
    @GetMapping("/find/{userName}")
    public User getUser(@PathVariable String userName) {
        return userService.findUser(userName);
    }

    /** Dont need this either? This endpoint does not work**/
    @GetMapping("/find/all")
    public List<User> getAllUser() {
        return userService.findAllUser();
    }

    /** Delete a User? **/
    @DeleteMapping("delete/{userName}")
    public String deleteUser(@PathVariable String userName) {
        return userService.deleteUser(userName);
    }
}
