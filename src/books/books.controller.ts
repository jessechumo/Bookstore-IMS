import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { AuthorService } from '../authors/author.service';
import { Author, Stock } from './books.model';
import { BooksService } from './books.service';

@Controller('api')
export class booksController {
  constructor(public booksService: BooksService) {} //todo- Adjuct public to private - recomended.
  
  @Post('books')
  async addBooks( // Adding a book
    @Body('title') bookTitle: string,
    @Body('author') bookAuthor: Author,
    @Body('yearOfPublication') bookYP: string,
    @Body('description') bookDesc: string,
    @Body('stock') bookStock: Stock,
  ){
    const feedback = await this.booksService.addBook(
      bookTitle,
      bookAuthor,
      bookYP,
      bookDesc,
      bookStock,
    );
    // return { id: generatedId };
    return  feedback ;
  }
  

  @Get('books')
  async getBooks(){  // get all books
   const books = await this.booksService.getBooks();
   return books;
  }

  
  @Get('books/:id')
  async getBook(@Param('id') bookId:string,){  // get a single book
    const book =await this.booksService.getBook(bookId);
    return book;
  }

  @Get('books/yearOfPublication/:yearOfPublication')
  async getYOP(@Param('yearOfPublication') yop:string,){  // get a book using year of publication.
    const book = await this.booksService.getYOP(yop);
    return book;
  }
  

  @Patch('books/:stock')
  async updateStock(@Param('stock') stock:number,){  // update stock
    const updatedStock = await this.booksService.updateStock(stock);
    return updatedStock;
  }
  // updateStock(@Param('id') bookId:string, @Body){}
} 

