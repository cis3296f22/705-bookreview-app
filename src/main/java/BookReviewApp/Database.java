package BookReviewApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class Database implements CommandLineRunner {

    @Autowired
    JdbcTemplate jdbc;

    /** Create the book table at the start of the program **/
    @Override
    public void run(String... strings) {
        jdbc.execute("CREATE TABLE IF NOT EXISTS book (" +
                "PRIMARY KEY (id), " +
                "id INT AUTO_INCREMENT, " +
                "title VARCHAR(255), " +
                "author VARCHAR(255), " +
                "genre VARCHAR(255)) ");
    }

    /** Get all books stored in the database **/
    public List<Book> getBooks() {
        return new ArrayList<>(jdbc.query("SELECT * FROM book", (rs, rowNum) -> new Book(
                rs.getInt("id"),
                rs.getString("title"),
                rs.getString("author"),
                rs.getString("genre"))));
    }

    /** Add a new book into the database **/
    public void addBook(Book book) {
        jdbc.update("INSERT INTO book" +
                "(title, author, genre) " +
                "VALUES (?, ?, ?)", book.getTitle(), book.getAuthor(), book.getGenre());
    }

    /** Update a book stored in the database **/
    public void updateBook(Integer id, Book book) {
        jdbc.update("UPDATE book SET " +
                "title = '" + book.getTitle() + "', " +
                "author = '" + book.getAuthor() + "', " +
                "genre = '" + book.getGenre() + "' " +
                "WHERE id = " + id);
    }

    /** Delete a book from the database **/
    public void deleteBook(Integer id) {
        jdbc.update("DELETE FROM book WHERE id = " + id);
    }
}
