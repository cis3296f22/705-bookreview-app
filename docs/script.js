var app = new function() {
    this.el = document.getElementById('books');

    /** Get all of the books stored in the database and list them **/
    this.getAll = async function() {
        const response = await fetch('http://127.0.0.1:8080/book/all');
        const data = await response.json();
        console.log(response);
        console.log(data);

        var temp = '';
        for (i = 0; i < data.length; i++) {
            temp += '<tr>';
            temp += '<td>' + data[i].bookId + '</td>';
            temp += '<td>' + data[i].title + '</td>';
            temp += '<td>' + data[i].author + '</td>';
            temp += '<td>' + data[i].genre + '</td>';
            temp += '<td><button onclick="app.Edit(\'' + data[i].bookId + '\',\'' + data[i].title + '\',\'' + data[i].author + '\',\'' + data[i].genre + '\')"  class="btn btn-warning">Edit</button></td>';
            temp += '<td><button onclick="app.Delete(\'' + data[i].bookId + '\')"  class="btn btn-danger">Delete</button></td>';
            temp += '</tr>';
        }

        this.Count(data.length);
        return this.el.innerHTML = temp;
    };

    /** Add a book **/
    this.Add = async function () {
        titleElem = document.getElementById('title');
        authorElem = document.getElementById('author');
        genreElem = document.getElementById('genre');

        if (titleElem.value && authorElem.value && genreElem.value) {
            const response = await fetch('http://127.0.0.1:8080/book/add', {
                method: 'POST',
                body: JSON.stringify({
                title: titleElem.value,
                author: authorElem.value,
                genre: genreElem.value,
            }),
            headers: {
                'Content-type': 'application/json'
            }});

            titleElem.value = '';
            authorElem.value = '';
            genreElem.value = '';
            this.getAll();
        }
    };

    /** Update a book **/
    this.Edit = function (bookId, title, author, genre) {
        var titleElem = document.getElementById('edit-title');
        var authorElem = document.getElementById('edit-author');
        var genreElem = document.getElementById('edit-genre');
        document.getElementById('edit-box').style.display = 'block';
        self = this;

        titleElem.value = title;
        authorElem.value = author;
        genreElem.value = genre;

        document.getElementById('save-edit').onsubmit = async function() {
            if (titleElem.value && authorElem.value && genreElem.value) {
                const response = await fetch('http://127.0.0.1:8080/book/update/' + bookId, {
                    method: 'PUT',
                    body: JSON.stringify({
                    title: titleElem.value,
                    author: authorElem.value,
                    genre: genreElem.value,
                }),
                headers: {
                    'Content-type': 'application/json'
                }});
                self.getAll();
                closeEditBox();
            }
        }
    };

    /** Delete a book **/
    this.Delete = async function (bookId) {
    const response = await fetch('http://127.0.0.1:8080/book/delete/' + bookId, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }});

        this.getAll();
    };

    /** Count the total number of books **/
    this.Count = function(data) {
        var el = document.getElementById('counter');
        var name = 'Books';

        if (data) {
            if (data == 1) {
                name = 'Book'
            }
            el.innerHTML = data + ' ' + name ;
        } else {
            el.innerHTML = 'No ' + name;
        }
    };
}

app.getAll();

function closeEditBox() {
    document.getElementById('edit-box').style.display = 'none';
}
