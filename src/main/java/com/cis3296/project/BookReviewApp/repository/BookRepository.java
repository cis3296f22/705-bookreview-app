package com.cis3296.project.BookReviewApp.repository;

import com.cis3296.project.BookReviewApp.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByTitle(String bookTitle);
}
