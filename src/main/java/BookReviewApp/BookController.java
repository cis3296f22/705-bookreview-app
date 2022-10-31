package BookReviewApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class BookController {

    @Autowired
    Database database;

    /** Mapping for the welcome page **/
    @GetMapping("/")
    public String getWelcomePage() {
        return "Welcome to the application";
    }
}
