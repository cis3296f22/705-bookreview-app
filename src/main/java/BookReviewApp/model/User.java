package BookReviewApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "userId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(name = "userName")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    /** a user can leave many reviews **/
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL) // a user can leave many reviews
    private List<Review> reviews;

    /** relation between user and books **/
//    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL) // CascadeType.ALL contains all cascade operation. used to populate a book table when adding a book
    @JoinTable( // creates the join table "user_book", along with the two composite keys
            name = "user_book",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId"), // user id in the join table
            inverseJoinColumns = @JoinColumn(name = "book_id", referencedColumnName = "bookId") // book id in the join table
    )
    private List<Book> bookList; // adding a book to this list will save user to book relationship

    /**
     * Adds a book to a user by updating the bookList
     * @param book - Book object
     */
    public void addBook(Book book) {
        bookList.add(book);
    }
}
