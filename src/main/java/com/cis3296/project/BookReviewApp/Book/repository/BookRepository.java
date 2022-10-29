package com.cis3296.project.BookReviewApp.Book.repository;

import com.cis3296.project.BookReviewApp.Book.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByTitle(String bookTitle);
}
