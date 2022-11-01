package com.cis3296.project.BookReviewApp.controller;

import com.cis3296.project.BookReviewApp.service.BookService;
import com.cis3296.project.BookReviewApp.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    BookService bookService;

    // do we need this endpoint? this should be handled in the front end?
    /** Welcome Page **/
    @GetMapping("/")
    public String getWelcomePage() {
        return "Welcome to the application";
    }

    /** Add a Book **/
    @PostMapping("/add")
    public String addBook(@RequestBody Book book) {
        boolean userExists = bookService.containsDuplicate(book.getTitle());
        return userExists == true ? "This Book Already Exists" : bookService.addBook(book);
    }

    /** Find a Specific Book (No error Handling)**/
    @GetMapping("/find/{bookTitle}")
    public Book getBook(@PathVariable String bookTitle) {
        System.out.println("getBook endpoint called");
        return bookService.findBook(bookTitle);
    }

    /** Find All Books **/
    @GetMapping("/find_all")
    public List<Book> getAllBooks() {
        System.out.println("getBook endpoint called");
        return bookService.findAllBooks();
    }

    /** Update a Book **/
    @PutMapping("/update/{bookId}")
    public String updateBook(@PathVariable Long bookId, @RequestBody Book book) {
        return bookService.updateBook(bookId, book);
    }
}
