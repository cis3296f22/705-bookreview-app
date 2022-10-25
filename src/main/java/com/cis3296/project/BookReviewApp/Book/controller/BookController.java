package com.cis3296.project.BookReviewApp.Book.controller;

import com.cis3296.project.BookReviewApp.Book.repo.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class BookController {

    @Autowired
    private BookRepo bookRepo;


    /*** Uncomment one of the following mappings for initial commit ***/

    /** Welcome Page **/
    @GetMapping(value = "/")
    public String getWelcomePage() {
        return "Welcome to the application";
    }

    /** Get all books **/
    /*
    @GetMapping(value = "/books")
    public List<Book> getBooks() {
        return bookRepo.findAll();
    }
    */

    /** Add a book **/
    /*
    @PostMapping(value = "/books/add")
    public String addBook(@RequestBody Book book) {
        bookRepo.save(book);
        return "Title: " + book.getTitle() + " Author: " + book.getAuthor() + " added.";
    }
     */

    /** Update a book **/
    /*
    @PutMapping(value = "/books/update/{id}")
    public String updateBook(@PathVariable Long id, @RequestBody Book book) {
        Book updatedBook = bookRepo.findById(id).get();
        updatedBook.setAuthor(book.getAuthor());
        updatedBook.setTitle(book.getTitle());
        updatedBook.setGenre((book.getGenre()));
        bookRepo.save(updatedBook);
        return updatedBook.getId() + " updated.";
    }
     */

    /** Delete a book **/
    /*
    @DeleteMapping(value = "/books/delete/{id}")
    public String deleteBook(@PathVariable Long id) {
        Book deleteBook = bookRepo.findById(id).get();
        bookRepo.delete(deleteBook);
        return id + " deleted.";
    }
     */
}
