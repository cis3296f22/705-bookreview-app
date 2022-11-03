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

    /** The controller class creates endpoints for our API **/

    @Autowired
    BookService bookService;

    /** Get all books **/
    @GetMapping("/all")
    public List<Book> getAllBooks() {
        System.out.println("getBook endpoint called");
        return bookService.getAll();
    }

    /** Add a book **/
    @PostMapping("/add")
    public String addBook(@RequestBody Book book) {
        boolean userExists = bookService.containsDuplicate(book.getTitle());
        return userExists ? "This Book Already Exists" : bookService.addBook(book);
    }

    /** Get a specific book by title **/
    @GetMapping("/get/{title}")
    public Book getBook(@PathVariable String title) {
        System.out.println("getBook endpoint called");
        return bookService.getBook(title);
    }

    /** Update a book **/
    @PutMapping("/update/{bookId}")
    public String updateBook(@PathVariable Integer bookId, @RequestBody Book book) {
        return bookService.updateBook(bookId, book);
    }

    /** Delete a book **/
    @DeleteMapping("/delete/{bookId}")
    public String deletebook(@PathVariable Integer bookId) {
        return bookService.deleteBook(bookId);
    }
}
