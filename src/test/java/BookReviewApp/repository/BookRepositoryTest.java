package BookReviewApp.repository;

import BookReviewApp.model.Book;
import BookReviewApp.service.BookService;
import BookReviewApp.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
class BookRepositoryTest {
    @Autowired
    BookRepository bookRepository;

    private static Book aBook;

    @BeforeAll
    public static void setUp() {
        aBook = Book.builder()
                .title("FAIRY TALE")
                .author("Stephen King")
                .genre("Literature ").build();
    }

    @Test
    public void saveBook() {
        Book book = Book.builder()
                .title("THE PHILOSOPHY")
                .author("Bob Dylan")
                .genre("Literature ").build();

        bookRepository.save(book);
        Assertions.assertNotNull(book.getBookId());
    }

    @Test
    public void deleteBook() {
        bookRepository.save(aBook);
        bookRepository.delete(aBook);
        Assertions.assertNotNull(aBook.getBookId());
    }
}