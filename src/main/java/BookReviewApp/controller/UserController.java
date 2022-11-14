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

    /** Creating a New User **/
    @PostMapping("/create")
    public String createUser(@RequestBody User user) {
        boolean userExists = userService.containsDuplicateUser(user.getUserName(), user.getEmail());
        return userExists == true ? "This User Has An Existing Account" : userService.createUser(user);
    }

    /** Not sure what situation we would need to look up a user. maybe in settings in order to change something? **/
//    @GetMapping("/find/{userName}")
//    public User getUser(@PathVariable String userName) {
//        return userService.findUser(userName);
//    }

    /** Finds All Users (Dont need?) **/
    @GetMapping("/find/all")
    public List<User> getAllUser() {
        return userService.findAllUser();
    }

    /** Delete a User **/
    @DeleteMapping("delete/{userName}")
    public String deleteUser(@PathVariable String userName) {
        return userService.deleteUser(userName);
    }

    /** Adds a Book To a User **/
    @PutMapping("add/{userId}")
    public boolean addBook(@PathVariable Long userId, @RequestBody Book book) {
        return userService.addBook(userId, book);
    }

    /** Find All Books belonging To a User (Called when viewing bookshelf to render all books belonging to a user) **/
    @GetMapping("get/{userId}")
    public List<Book> getUserBooks(@PathVariable Long userId) {
        return userService.getUserBooks(userId);
    }

    /** Verify User Login **/
    @GetMapping("/login/{userName}/{password}")
    public boolean userLogin(@PathVariable String userName, @PathVariable String password) {
        return userService.userLogin(userName, password);
    }
}

