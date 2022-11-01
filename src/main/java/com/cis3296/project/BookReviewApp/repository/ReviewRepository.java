package com.cis3296.project.BookReviewApp.repository;
import com.cis3296.project.BookReviewApp.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
