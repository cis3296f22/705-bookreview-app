package BookReviewApp.repository;

import BookReviewApp.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    /**
     * Queries book by title
     * @param bookTitle - Book object's title
     * @return Book queried book object
     */
    Book findByTitle(String bookTitle);

    /**
     * Deletes book by title
     * @param title - Book object's title
     */
    void deleteByTitle(String title);

    /**
     * Queries list of books by shelfId
     * @param shelfId - Book object's shelf id
     * @return list of queried book object
     */
    List<Book> findAllByShelfId(Integer shelfId);
}
