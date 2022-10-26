# CIS 3296: Book Review Web Application Project

This is a README file for our CIS 3296 Course Project.

### Trello Board
https://trello.com/b/YncmQM2F/sprint

### Description of Project:
A web application that allows users to rate books, write reviews, track reading history, and see statistical data on the most read genres.

### Members:
* Ben Baldino
* Tugs Khaliunbat
* Steven Lin
* Brian Rangel
* Destinee Sheung

### Building Instructions:
* Download IntelliJ IDE for development, PgAdmin (PostgreSQL) for database management, and Postman to interact with the endpoints.
* Clone the Github repo on your local machine.
* Access the database using pgAdmin (postgres configuration are available in the `src/main/resources/application.properties` file).
* Run the program to start the backend of the project.
* To access the backend, go to localhost:8080 in your web browser or in Postman (recommended).
* As an example, if you wanted to interact with the addBook endpoint of the backend, the body of the request should be: 
  ```
  {
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Book Genre"
  }
  ```

### Installation Instructions:
To install the program, go to the "Releases" tab on the right side of this GitHub page and download the executable JAR file. Once the JAR file is downloaded, run the following command in your command-line to start up the proof of concept.
```
java -jar <filename>.jar
```
