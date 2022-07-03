import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Author, Book } from './books.model';
import { BooksService } from './books.service';

@Controller('api')
export class booksController {
  constructor(public booksService: BooksService) {}

  // Adding a book
  @Post('books')
  async addBooks(
    @Body('title') bookTitle: string,
    @Body('author') bookAuthor: Author,
    @Body('yearOfPublication') bookYP: string,
    @Body('description') bookDesc: string,
    @Body('ISBN') bookISBN: string,
  ) {
    const feedback = await this.booksService.addBook(
      bookTitle,
      bookAuthor,
      bookYP,
      bookDesc,
      bookISBN,
    );
    return feedback;
  }

  // get all books
  @Get('books')
  async getBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  // get a single book
  @Get('books/:id')
  async getBook(@Param('id') bookId: string) {
    const book = await this.booksService.getBook(bookId);
    return book;
  }

  // get a book using year of publication.
  @Get('books/yearOfPublication/:yearOfPublication')
  async getYOP(@Param('yearOfPublication') yop: string) {
    const book = await this.booksService.getYOP(yop);
    return book;
  }
}
