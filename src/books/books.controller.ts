import {Body, Controller, Post} from '@nestjs/common';
import { booksService } from './books.service';


@Controller('books')
export class booksController{
    constructor(public booksService: booksService) {} //todo- Adjuct public to private.
    // Adding a book
    @Post()
    addBooks(@Body('title') bookTitle:string, @Body('author') bookAuthor:string, @Body('year_of_publication') bookYP:string, @Body('description') bookDesc:string):any{
      const generatedId =  this.booksService.addBook(bookTitle,bookAuthor,bookYP,bookDesc);
      return {id:generatedId};
    }
}