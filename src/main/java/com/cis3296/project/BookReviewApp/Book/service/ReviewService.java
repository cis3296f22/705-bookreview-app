package com.cis3296.project.BookReviewApp.Book.service;

import com.cis3296.project.BookReviewApp.Book.model.Review;
import com.cis3296.project.BookReviewApp.Book.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }
}

