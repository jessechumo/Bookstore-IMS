<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

A Rest API for managing a bookstore inventory.

## Installation

- Clone the project.    
```bash 
$ git clone https://github.com/Jesse-Bett/Bookstore-IMS.git 
```  

- Install all dependancies.


```bash
$ npm i
```

## Running the app

- Starting the server.

```bash
# watch mode
$ npm run start:dev
```

- Adding a book to the inventory. Sample book object shown below.
``` POST ``` ``` http://localhost:3000/api/books```

```
{
    "title":"Principles of Data Structures Using C and C++",
    "author":{
        "firstName":"Vinu",
        "lastName":"V",
        "email":"vinuv@gmail.com",
        "dateOfBirth":"21-12-1967"
    },
    "description":"become an ace in data structures today",
    "yearOfPublication":"2008"
}
```

- Get all books.
```GET``` ```http://localhost:3000/api/books```


- Get a book by id.
```GET``` ```http://localhost:3000/api/books/62b87b9f4159e1dcfab4f204```

- Get all authors.
```GET``` ```http://localhost:3000/api/authors```

- Get a single author.
```GET``` ```http://localhost:3000/api/authors/James```

- Get a book by year of publication.
```GET``` ```http://localhost:3000/api/books/yearOfPublication/2008```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

