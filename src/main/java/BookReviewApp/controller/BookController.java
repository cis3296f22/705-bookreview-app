package BookReviewApp.controller;

import BookReviewApp.model.Book;
import BookReviewApp.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/book")
public class BookController {

    @Autowired
    BookService bookService;

    /**
     * Get all books from database belonging to a user
     * Handles GET REQUEST for Book objects
     * @return HTTP response with the status code, list of Book objects, and header
     */
    @GetMapping("/all")
    public List<Book> getAllBooks() {
        System.out.println("getBook endpoint called");
        return bookService.getAll();
    }

    /**
     * Add a book
     * @param book - Book object
     * @return HTTP response with the status code, String, and header
     */
    @PostMapping("/add")
    public String addBook(@RequestBody Book book) {
//        boolean bookExists = bookService.containsDuplicate(book);
//        return bookExists ? "This Book Already Exists" : bookService.addBook(book);
        return bookService.addBook(book);
    }

    /**
     * Get a specific book by its title
     * @param title - Book object's title
     * @return HTTP response with the status code, Book object, and header
     */
    @GetMapping("/get/{title}")
    public Book getBook(@PathVariable String title) {
        System.out.println("getBook endpoint called");
        return bookService.getBook(title);
    }

    /**
     * Update a user's book in database
     * @param bookId - Book object's id
     * @param book - Book object
     * @return HTTP response with the status code, String, and header
     */
    @PutMapping("/update/{bookId}")
    public String updateBook(@PathVariable Long bookId, @RequestBody Book book) {
        return bookService.updateBook(bookId, book);
    }

    /**
     * Delete a book from a user
     * @param bookId - Book object's id
     * @return HTTP response with the status code, String, and header
     */
    @DeleteMapping("/delete/{bookId}")
    public String deletebook(@PathVariable Long bookId) {
        return bookService.deleteBookById(bookId);
    }
}
