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

    /**
     * Find all books
     * @return list of all books belonging to all users
     */
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    /**
     * Find book by shelf (unused)
     * @param shelfId - The shelf Id belonging to a book object
     * @return list of all books with specified shelf id
     */
    public List<Book> findAllByShelf(Integer shelfId) {
        return bookRepository.findAllByShelfId(shelfId);
    }

    /**
     * Adding new book
     * @param book - The book object
     * @return String
     */
    public String addBook(Book book) {
        bookRepository.save(book);
        return String.format("Successfully Added %s.", book.getTitle());
    }

    /**
     * Find book by title
     * @param title - Title of the book object
     * @return saved book object
     */
    public Book getBook(String title) {
        return bookRepository.findByTitle(title);
    }

    /**
     * Update Book
     * @param bookId - Book object's Id
     * @param book - Book object with new fields to update original
     * @return String
     */
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

    /**
     * Delete a Book By Id
     * @param bookId - Book object's id
     * @return String
     */
    @Transactional
    public String deleteBookById(Long bookId) {
        bookRepository.deleteById(bookId);
        return String.format("Book ID: %d has been deleted.", bookId);
    }

    /**
     * Removes a book from a user (unused)
     * @param userId - User object's Id
     * @param bookTitle - Book object's Title
     * @return Book object's Id
     */
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

    /**
     * checks for duplicate books (unused)
     * @param book - Book object
     * @return Boolean
     */
    public boolean containsDuplicate(Book book) {
        return bookRepository.existsById(book.getBookId());
    }
}
