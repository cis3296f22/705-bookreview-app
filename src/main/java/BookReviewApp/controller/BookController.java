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

    /** Get all books (dont need?) **/
    @GetMapping("/all")
    public List<Book> getAllBooks() {
        System.out.println("getBook endpoint called");
        return bookService.getAll();
    }

      /** Add a book (dont need? we have another endpoint to add book in the user controller) **/
//    @PostMapping("/add")
//    public String addBook(@RequestBody Book book) {
//        boolean userExists = bookService.containsDuplicate(book.getTitle());
//        return userExists ? "This Book Already Exists" : bookService.addBook(book);
//    }

    /** Get a specific book by title (dont need?) **/
//    @GetMapping("/get/{title}")
//    public Book getBook(@PathVariable String title) {
//        System.out.println("getBook endpoint called");
//        return bookService.getBook(title);
//    }

    /** Update a book **/
    @PutMapping("/update/{bookId}")
    public String updateBook(@PathVariable Long bookId, @RequestBody Book book) {
        return bookService.updateBook(bookId, book);
    }

    /** Removes a Book From a User && Delete The Book Entirely **/
    @DeleteMapping("/delete/{userId}/{bookTitle}")
    public boolean deleteBook(@PathVariable Long userId, @PathVariable String bookTitle) {
        Long bookId = bookService.removeBookFromUser(userId, bookTitle); // removes book relation and return book id
        bookService.deleteBookById(bookId); // removes book
        return true;
    }
}
