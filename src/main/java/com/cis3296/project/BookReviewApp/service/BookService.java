package com.cis3296.project.BookReviewApp.service;

import com.cis3296.project.BookReviewApp.model.Book;
import com.cis3296.project.BookReviewApp.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service // our query logic goes here
public class BookService {
    @Autowired
    BookRepository bookRepository;

    /** Add a Book **/
    public String addBook(Book book) {
        bookRepository.save(book); // returns the book that was saved
        return String.format("Successfully Added %s.", book.getTitle());
    }

    /** Find a Book **/
    public Book findBook(String bookTitle) {
        return bookRepository.findByTitle(bookTitle);
    }

    /** Find all Books **/
    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    /**  Update a Book **/
    public String updateBook(@PathVariable Long bookId, @RequestBody Book book) {
        Book updatedBook = bookRepository.findById(bookId).get();
        updatedBook.setAuthor(book.getAuthor());
        updatedBook.setTitle(book.getTitle());
        updatedBook.setGenre((book.getGenre()));
        bookRepository.save(updatedBook);
        return String.format("Book id: %d has been updated.", updatedBook.getBookId());
    }

    /** Checks If User Already Exists. **/
    public boolean containsDuplicate(String bookTitle){
        List<Book> allUsers = bookRepository.findAll();
        boolean duplicateBook = allUsers.stream().filter(o -> o.getTitle().equals(bookTitle)).findFirst().isPresent();
        return (duplicateBook);
    }
}
