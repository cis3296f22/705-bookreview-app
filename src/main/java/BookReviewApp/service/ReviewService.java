package BookReviewApp.service;

import BookReviewApp.model.Review;
import BookReviewApp.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    /**
     * Creates a book review
     * @param review - Review object
     * @return Saved review object
     */
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }
}

