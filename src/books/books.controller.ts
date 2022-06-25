import { Body, Controller, Post } from '@nestjs/common';
import { booksService } from './books.service';

@Controller('books')
export class booksController {
  constructor(public booksService: booksService) {} //todo- Adjuct public to private.
  // Adding a book
  @Post()
  addBooks(
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
} //title:string,author:object,firstName:string,lastName:string,email:string,dateOfBirth:Date, year_of_publication:string, description:string
