package BookReviewApp.controller;

import BookReviewApp.service.ReviewService;
import BookReviewApp.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    /**
     * Create a review
     * @param review - Review object
     * @return saved review object
     */
    @PostMapping("create")
    public Review createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }
}
