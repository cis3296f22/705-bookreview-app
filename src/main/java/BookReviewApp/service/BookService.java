package BookReviewApp.service;

import BookReviewApp.model.Book;
import BookReviewApp.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service // our query logic goes here
public class BookService {

    /** The service class is called by the controller class to perform tasks **/

    @Autowired
    BookRepository bookRepository;

    /** Get all books **/
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    /** Add a book **/
    public String addBook(Book book) {
        bookRepository.save(book);
        return String.format("Successfully Added %s.", book.getTitle());
    }

    /** Get a book **/
    public Book getBook(String title) {
        return bookRepository.findByTitle(title);
    }

    /**  Update a Book **/
    public String updateBook(@PathVariable Integer bookId, @RequestBody Book book) {
        Book updatedBook = bookRepository.findById(bookId).get();
        updatedBook.setAuthor(book.getAuthor());
        updatedBook.setTitle(book.getTitle());
        updatedBook.setGenre((book.getGenre()));
        bookRepository.save(updatedBook);
        return String.format("Book ID: %d has been updated.", updatedBook.getBookId());
    }

    /**  Delete a Book **/
    public String deleteBook(Integer bookId) {
        bookRepository.deleteById(bookId);
        return String.format("Book ID: %d has been deleted.", bookId);
    }

    /** Checks if the book being added already exists. **/
    public boolean containsDuplicate(String title){
        List<Book> allUsers = bookRepository.findAll();
        boolean duplicateBook = allUsers.stream().filter(o -> o.getTitle().equals(title)).findFirst().isPresent();
        return (duplicateBook);
    }
}
