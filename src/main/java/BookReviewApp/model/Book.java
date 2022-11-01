package BookReviewApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "book")
public class Book {

    /** The book class represents the model that will be stored within the database **/

    @Id
    @Column(name = "bookId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookId;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "genre")
    private String genre;

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Review> reviews;
}
