package BookReviewApp.repository;

import BookReviewApp.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByTitle(String bookTitle);

    void deleteByTitle(String title);
}
