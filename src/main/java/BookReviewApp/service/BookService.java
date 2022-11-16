package BookReviewApp.service;

import BookReviewApp.model.Book;
import BookReviewApp.model.User;
import BookReviewApp.repository.BookRepository;
import BookReviewApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service // our query logic goes here
public class BookService {

    /** The service class is called by the controller class to perform tasks **/

    @Autowired
    BookRepository bookRepository;

    @Autowired
    UserRepository userRepository;

    /** Get all books **/
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    public List<Book> findAllByShelf(Integer shelfId) {
        return bookRepository.findAllByShelfId(shelfId);
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
    public String updateBook(@PathVariable Long bookId, @RequestBody Book book) {
        Book updatedBook = bookRepository.findById(bookId).get();
        updatedBook.setAuthor(book.getAuthor());
        updatedBook.setTitle(book.getTitle());
        updatedBook.setGenre((book.getGenre()));
        updatedBook.setShelfId(book.getShelfId());
        updatedBook.setIsbn(book.getIsbn());
        bookRepository.save(updatedBook);
        return String.format("Book ID: %d has been updated.", updatedBook.getBookId());
    }

    /**  Delete a Book By Id **/
    @Transactional
    public String deleteBookById(Long bookId) {
        bookRepository.deleteById(bookId);
        return String.format("Book ID: %d has been deleted.", bookId);
    }

    /** Removes a book from a user **/
    @Transactional
    public Long removeBookFromUser(Long userId, String bookTitle) {
        Long bookId = null;
        User user = userRepository.findById(userId).get();
        for (Book book : user.getBookList()) {
            if (book.getTitle().equals(bookTitle)) {
                user.getBookList().remove(book);
                bookId = book.getBookId();
                break;
            }
        }
        return bookId;
    }

    public boolean containsDuplicate(Book book) {
        return bookRepository.existsById(book.getBookId());
    }
}
