package BookReviewApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Builder
@Table(name = "book")
public class Book {

    /** The book class represents the model that will be stored within the database **/

//    @JsonIgnore
    @Id
    @Column(name = "bookId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "genre")
    private String genre;

    @JsonIgnore
    @OneToMany(mappedBy = "book")
    private List<Review> reviews;

    @JsonIgnore
    @ManyToMany(mappedBy = "bookList", fetch = FetchType.LAZY)
    private List<User> userList = new ArrayList<>();
}
