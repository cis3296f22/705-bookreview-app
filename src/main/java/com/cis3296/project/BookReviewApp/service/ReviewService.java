package com.cis3296.project.BookReviewApp.service;

import com.cis3296.project.BookReviewApp.model.Review;
import com.cis3296.project.BookReviewApp.repository.ReviewRepository;
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

