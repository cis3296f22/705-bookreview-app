package BookReviewApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {

    @Autowired
    Database database;

    /** Welcome page **/
    @GetMapping("/")
    public String getWelcomePage() {
        return "Welcome to the application";
    }

    /** Get all books **/
    @GetMapping("/books")
    public List<Book> getBooks() {
        return database.getBooks();
    }

    /** Add a book **/
    @PostMapping("/add")
    public String addBook(@RequestBody Book book) {
        database.addBook(book);
        return "Added book!\n" + book.toString();
    }

    /** Update a book **/
    @PutMapping("/update/{id}")
    public String updateBook(@PathVariable Integer id, @RequestBody Book book) {
        database.updateBook(id, book);
        return "Book with ID = " + id + " has been updated.";
    }

    /** Delete a book **/
    @DeleteMapping("/delete/{id}")
    public String deleteBook(@PathVariable Integer id) {
        database.deleteBook(id);
        return "Book with ID = " + id + " has been deleted.";
    }
}
