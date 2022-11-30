package BookReviewApp.controller;

import BookReviewApp.model.Book;
import BookReviewApp.service.UserService;
import BookReviewApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    /**
     * Creating a New User
     * @param user - User object
     * @return user object's id
     */
    @PostMapping("/create")
    public Long createUser(@RequestBody User user) {
        boolean userExists = userService.containsDuplicateUser(user.getUserName(), user.getEmail());
        return userExists == true ? Long.valueOf(0) : userService.createUser(user);
    }

    /**
     * Finds All Users
     * @return list of all user object
     */
    @GetMapping("/find/all")
    public List<User> getAllUser() {
        return userService.findAllUser();
    }

    /**
     * Delete a User
     * @param userName - User object's username
     * @return String
     */
    @DeleteMapping("delete/{userName}")
    public String deleteUser(@PathVariable String userName) {
        return userService.deleteUser(userName);
    }

    /**
     * Adds a Book To a User
     * @param userId - User object's id
     * @param book - Book object
     * @return Boolean
     */
    @PostMapping("add/{userId}")
    public boolean addBook(@PathVariable Long userId, @RequestBody Book book) {
        return userService.addBook(userId, book);
    }

    /**
     * Find All Books belonging To a User
     * @param userId - User object's id
     * @return list of books belonging to userId
     */
    @GetMapping("get/{userId}")
    public List<Book> getUserBooks(@PathVariable Long userId) {
        return userService.getUserBooks(userId);
    }

    /**
     * Verify User Login
     * @param email - User object's email
     * @param password - User object's password
     * @return user object's id
     */
    @GetMapping("/login/{email}/{password}")
    public Long userLogin(@PathVariable String email, @PathVariable String password) {
        return userService.userLogin(email, password);
    }

    /**
     * Get user information
     * @param userId - User object's id
     * @return userId, userName, email
     */
    @GetMapping("/info/{userId}")
    public User userLogin(@PathVariable Long userId) {
        return userService.getUserInfo(userId);
    }

    @GetMapping("/userName/{userId}")
    public String getUserName(@PathVariable Long userId) {
        return userService.getUserName(userId);
    }
}

