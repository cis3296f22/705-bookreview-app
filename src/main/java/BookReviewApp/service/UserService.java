package BookReviewApp.service;

import BookReviewApp.model.Book;
import BookReviewApp.model.User;
import BookReviewApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    /**
     * Creating a New User
     * @param user - User object
     * @return User object's Id
     */
    public Long createUser(User user) {
        return userRepository.save(user).getUserId(); // after user creates account, their user id will be stored globally in the front end
    }

    /**
     * Checks If User Already Exists
     * @param userName - User object's username
     * @param email - User object's email
     * @return Boolean
     */
    public boolean containsDuplicateUser(String userName, String email){
        List<User> allUsers = userRepository.findAll();
        boolean duplicateUserName = allUsers.stream().filter(o -> o.getUserName().equals(userName)).findFirst().isPresent();
        boolean duplicateUserEmail = allUsers.stream().filter(o -> o.getEmail().equals(email)).findFirst().isPresent();
        return (duplicateUserName || duplicateUserEmail);
    }

    /**
     * Deleting a User
     * @param userName - User object's username
     * @return String
     */
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

    /**
     * find all users
     * @return list of all User object
     */
    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    /**
     * Checks if Book Already Belongs To a User (unused)
     * @param bookTitle - Book object's title
     * @param userId - User object's id
     * @return Boolean
     */
    public boolean containsDuplicateBook(String bookTitle, Long userId){
        User currentUser = userRepository.findById(userId).get(); // Retrieves user in order to access its "getBookList" method to find duplicate book
        boolean duplicateBook = currentUser.getBookList().stream().filter(o -> o.getTitle().equals(bookTitle)).findFirst().isPresent();
        return (duplicateBook);
    }

    /**
     * User Adds a Book
     * @param userId - User object's id
     * @param book - Book object
     * @return Boolean
     */
    public boolean addBook(Long userId, Book book) {
        boolean dupBook = containsDuplicateBook(book.getTitle(), userId); // checks if user is adding a duplicate book
        if (dupBook) {return false;}
        else {
            User user = userRepository.findById(userId).get();
            user.addBook(book); // add Book to user's list containing books
            userRepository.save(user);
            return true;
        }
    }

    /**
     * Retrieves All Books belonging to a user
     * @param userId - User object's id
     * @return list of book objects belonging to userId
     */
    public List<Book> getUserBooks(Long userId) {
        User user = userRepository.findById(userId).get();
        return user.getBookList();
    }

    /**
     * Validates User Login
     * @param email - User object's email
     * @param password - User object's password
     * @return User object's id
     */
    public Long userLogin(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password); // after user login, their user id will be stored globally in the front end
        return user != null ? user.getUserId() : 0;
    }

    /**
     * Get user information
     * @param userId - User object's id
     * @return userId, userName, email
     */
    public User getUserInfo(Long userId) {
        User user = userRepository.findByUserId(userId);
        return user;
    }

    public String getUserName(Long userId) {
        User user = userRepository.findByUserId(userId);
        return user.getUserName();
    }
}
