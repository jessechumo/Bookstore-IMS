
## Endpoints


|Link|Method|Description|
|----|------|----------- |
|/api/books|POST|Add a book to the inventory|
|/api/books|GET|Get all books|
|/api/books/62b87b9f4159e1dcfab4f204|GET|Get a book by id|
|/api/authors|GET|Get all authors|
|/api/authors/James|GET|Get a single author|
|/api/books/yearOfPublication/2008|GET|Get a book by year of publication|
|/api/stock|POST|Add stock. Use the book ISBN|
|/api/stock|GET|Get all stock listings|
|/api/stock/987885-673789-4525|GET|Get a single stock using ISBN|
|/api/stock/987885-673789-4525|PUT|Update a single stock using ISBN|




- A sample book object is shown below.
```
{
    "title":"C and C++",
    "author":{
        "firstName":"Vinu",
        "lastName":"vii",
        "email":"vinuv@gmail.com",
        "dateOfBirth":"21-12-1967"
    },
    "description":"become an ace in data structures today",
    "yearOfPublication":"2008",
    "ISBN": "2345-9875-6739"
}
```

- A sample stock object is shown below. When updating stock, only the ISBN and quantity is required.The rest of the data is dynamically generated. 

```
{
  "ISBN": "987885-673789-4525",
    "quantity": 0,
    "status": "out of stock",
    "history": [
        21,
        1,
        0,
        24,
        45,
        4,
        7,
        21,
        0
    ]
}
```



## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
## Database Design

- Book database.

| Field       | Data Type |
|-------------|-----------|
|  _id        |   string    |
|  title      |   string    |
|  author     | Object      |
|author.firstName| string   |
|author.lastName|string     |
|author.email|string        |
|author.dateOfBirth|string  |
|yearOfPublication| string  |
| description| string       |
|ISBN        | string       | 

- Stock database.

| Field       | Data Type |
|-------------|-----------|
|ISBN| String|
| quantity| number|
|status| string|
|history| Array|




