package BookReviewApp.model;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "review")
public class Review {
    @Id
    @Column(name = "reviewId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    @Column(name = "report")
    private String report;

    @Column(name = "user_id")
    private long _userId;

    @ManyToOne // false meaning ignore these fields during operation (dont have to pass user and book object)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", insertable = false, updatable = false) // user_fk is a column name referenceing user id in review table
    private User user;


    @Column(name = "book_id")
    private long _bookId;

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "bookId", insertable = false, updatable = false) // user_fk is a column name referenceing user id in review table
    private Book book;

    /**
     * @return
     */
    public String getReport() {
        return report;
    }

    /**
     * @param report
     */
    public void setReport(String report) {
        this.report = report;
    }

    /**
     * @return
     */
    public long getReviewId() {
        return reviewId;
    }

    /**
     * @param reviewId
     */
    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }

    /**
     * @return
     */
    public User getUser() {
        return user;
    }

    /**
     * @param user
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * @return
     */
    public Book getBook() {
        return book;
    }

    /**
     * @param book
     */
    public void setBook(Book book) {
        this.book = book;
    }

    /**
     * @return
     */
    public long get_userId() {
        return _userId;
    }

    /**
     * @param _userId
     */
    public void set_userId(long _userId) {
        this._userId = _userId;
    }

    /**
     * @return
     */
    public long get_bookId() {
        return _bookId;
    }

    /**
     * @param _bookId
     */
    public void set_bookId(long _bookId) {
        this._bookId = _bookId;
    }
}
