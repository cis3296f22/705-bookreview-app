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

### Testing Instructions:
* Download IntelliJ IDE for development and Postman to interact with the endpoints.
* Clone the Github repo on your local machine.
* Run the program to start the backend of the project.
* To check endpoints open Postman
  
  (If you wan to change to dark theme it will be the gear next to the 'Invite' button -> settings -> and themes)
      
* To access the backend, go to Postman and under Search Postman click the + to start a new instance.

    ![image](https://user-images.githubusercontent.com/112522605/199356570-b4e6bf70-cd71-4223-b407-ac5bc21c43ed.png)

* In the "Enter Request URL" field you will put and hit send when done:
  ```
  localhost:8080
  ```
* You should receive a welcome message 

    ![image](https://user-images.githubusercontent.com/112522605/199356380-aa5bcfc0-d73b-4543-9c70-20ef2765141c.png)

* To add a book you will change 'Get' to 'Post', you will change to 'Body', 'raw', and to 'JSON'

    ![image](https://user-images.githubusercontent.com/112522605/199357210-9b1e592e-fbea-45be-8ad8-32081fb57145.png)

* You will change the URL to:
  ```
  localhost:8080/add
  ```
* In the body you will add:
  ```
  {
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Book Genre"
  }
  ```
  
    ![image](https://user-images.githubusercontent.com/112522605/199357700-498068b6-8af2-4b34-90eb-48698a453a0f.png)

* When finished you should have:

    ![image](https://user-images.githubusercontent.com/112522605/199357792-1449e7a6-74d5-47fd-ac7a-c4b3bfb94347.png)
    
* To see the added book(s) you will change the 'Post' back to 'Get' and change URL to:
  ```
  localhost:8080/books
  ```
    ![image](https://user-images.githubusercontent.com/112522605/199358880-ef15dcaf-fa9f-4f99-86df-512690d85be6.png)
* You should see the book(s) in the lower body.

    ![image](https://user-images.githubusercontent.com/112522605/199359037-465c87c4-dcc1-42c9-95f3-d6b2d9f7a62a.png)
* To change or update a book you will change 'Get' to 'Put' and the URL to (the id will be the id that you can see in the lower body of the last step): 
  ```
  localhost:8080/update/[id]
  ```
    ![image](https://user-images.githubusercontent.com/112522605/199359624-6a4040cb-21ca-4c77-af6d-1d8773b585b4.png)
* You can then change/update the title, author, or genre using the same scheme as before and press send when done:
  ```
  {
    "title": "change Book Title",
    "author": "change Author Name",
    "genre": "change Book Genre"
  }
  ```
    ![image](https://user-images.githubusercontent.com/112522605/199359774-91f44d38-acd8-4429-8d92-a7c76c207510.png)
* To delete a book you will change 'Put' to 'Delete' and will change the URL to:
  ```
  localhost:8080/delete/[id]
  ```
    ![image](https://user-images.githubusercontent.com/112522605/199360074-bf9986d7-6d30-43fe-96b5-f0c075bb78fe.png)

* To check to see that it worked you can change 'Delete' to 'Get' and URL to:
  ```
  localhost:8080/books
  ```
* If you only had one book it should be empty, in the example there were 2 books, so only the 2nd book remains.

    ![image](https://user-images.githubusercontent.com/112522605/199360367-eba046c5-43e9-41cc-8840-a8205598d3a0.png)


