import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { booksService } from './books.service';

@Controller('books')
export class booksController {
  constructor(public booksService: booksService) {} //todo- Adjuct public to private - recomended.
  
  @Post()
  addBooks( // Adding a book
    @Body('title') bookTitle: string,
    @Body('author') bookAuthor: object,
    @Body('firstName') authorFirstName: string,
    @Body('lastName') authorLastName: string,
    @Body('email') authorEmail: string,
    @Body('dateOfBirth') authorDOB: Date,
    @Body('yearOfPublication') bookYP: string,
    @Body('description') bookDesc: string,
  ): any {
    const feedback = this.booksService.addBook(
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
  getBooks(){  // get all books
    return this.booksService.getBooks();
  }

  @Get(':id')
  getBook(@Param('id') bookId:string,){  // get a single book
    return this.booksService.getBook(bookId);
  }
} 
