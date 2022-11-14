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

    /** Creating a New User **/
    public String createUser(User user) {
        userRepository.save(user);
        return String.format("Welcome %s!", user.getUserName());
    }

    /** Checks If User Already Exists **/
    public boolean containsDuplicateUser(String userName, String email){
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

    /** Checks if Book Already Belongs To a User **/
    public boolean containsDuplicateBook(String bookTitle, Long userId){
        User currentUser = userRepository.findById(userId).get(); // Retrieves user in order to access its "getBookList" method to find duplicate book
        boolean duplicateBook = currentUser.getBookList().stream().filter(o -> o.getTitle().equals(bookTitle)).findFirst().isPresent();
        return (duplicateBook);
    }

    /** User Adds a Book **/
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

    /** Retrieves All Books belonging to a user (called from front end bookshelf) **/
    public List<Book> getUserBooks(Long userId) {
        User user = userRepository.findById(userId).get();
        return user.getBookList();
    }

    /** Validates User Login **/
    public boolean userLogin(String userName, String password) {
        User user = userRepository.findByUserName(userName);
        return user.getPassword().equals(password) ? true : false;
    }
}
