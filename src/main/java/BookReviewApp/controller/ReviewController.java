package BookReviewApp.controller;

import BookReviewApp.service.ReviewService;
import BookReviewApp.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    /** Create a review (No error handling yet) **/
    @PostMapping("create")
    public Review createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }
}