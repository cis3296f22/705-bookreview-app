# CIS3296: Book Review Web Application Project

This is a README file for CIS3296 Course Project.

### Description of Project:
A web application that allows users to rate books, write reviews, track reading history, and see statistical data on most read genre.

### Members:
* Ben Baldino
* Tugs Khaliunbat
* Steven Lin
* Brian Rangel
* Destinee Sheung

### Getting started
##### For our initial individual commit:
   * Download IntelliJ IDE, PgAdmin for database management, and Postman
   * Clone Github repo on you local machine
   * Access database using pgAdmin (postgres configuration are available in `src/main/resources/application.properties` file)
   * Run the program and go to localhost:8080 in your web browser (at this point, there aren't any mappings yet)
   * Uncomment any one of the mappings in `BookController.java` file.
   * Run the program again to check the specific mapping that you have added using Postman.
     * For example, the body of the request to check addBook method should look: ```{
       "title": "Book Title",
       "author": "Author Name",
       "genre": "Book Genre"
       }```.
   * Commit to branch dev and create a pull request.



