import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class booksController {
  constructor(public booksService: BooksService) {} //todo- Adjuct public to private - recomended.
  
  @Post()
  async addBooks( // Adding a book
    @Body('title') bookTitle: string,
    @Body('author') bookAuthor: object,
    @Body('firstName') authorFirstName: string,
    @Body('lastName') authorLastName: string,
    @Body('email') authorEmail: string,
    @Body('dateOfBirth') authorDOB: Date,
    @Body('yearOfPublication') bookYP: string,
    @Body('description') bookDesc: string,
  ){
    const feedback = await this.booksService.addBook(
      bookTitle,
      bookAuthor,
      authorFirstName,
      authorLastName,
      authorEmail,
      authorDOB,
      bookYP,
      bookDesc,
    );
    // return { id: generatedId };
    return  feedback ;
  }

  @Get()
  async getBooks(){  // get all books
   const books = await this.booksService.getBooks();
   return books;
  }

  @Get(':id')
  async getBook(@Param('id') bookId:string,){  // get a single book
    const book =await this.booksService.getBook(bookId);
    return book;
  }

  // @Patch(':id')
  // updateStock(@Param('id') bookId:string, @Body){}
} 
