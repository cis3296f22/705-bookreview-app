package BookReviewApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class Database implements CommandLineRunner {

    @Autowired
    JdbcTemplate jdbc;

    /** Create the book table at the start of the program **/
    @Override
    public void run(String... strings) {
        jdbc.execute("DROP TABLE book IF EXISTS");
        jdbc.execute("CREATE TABLE book ( " +
                "title VARCHAR(255), " +
                "author VARCHAR(255), " +
                "genre VARCHAR(255)) ");
        System.out.println("Book database created!");
    }
}
