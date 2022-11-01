package com.cis3296.project.BookReviewApp.model;

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

    @Id
    @Column(name = "bookId") // represent column names within book table
    @GeneratedValue(strategy = GenerationType.IDENTITY) // this is how our primary key "bookId" is generated, auto increment by 1
    private long bookId;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "genre")
    private String genre;

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL) // one book can have many reviews
    private List<Review> reviews;

    /**  getters and setters replaced with lombok annotations **/
//    public long getBookId() {
//        return bookId;
//    }
//
//    public void setBookId(long bookId) {
//        this.bookId = bookId;
//    }
//
//    public List<Review> getReviews() {
//        return reviews;
//    }
//
//    public void setReviews(List<Review> reviews) {
//        this.reviews = reviews;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getAuthor() {
//        return author;
//    }
//
//    public void setAuthor(String author) {
//        this.author = author;
//    }
//
//    public String getGenre() {
//        return genre;
//    }
//
//    public void setGenre(String genre) {
//        this.genre = genre;
//    }
}
