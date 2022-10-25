package com.cis3296.project.BookReviewApp.Book.repo;

import com.cis3296.project.BookReviewApp.Book.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book, Long> {

}
