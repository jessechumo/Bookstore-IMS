import { Body, Controller, Post, Get, Param, Patch, Put } from '@nestjs/common';
import { Author, Book,} from './books.model';
import { BooksService } from './books.service';
import { UpdateStockDto } from './updateStock.dto';

@Controller('api')
export class booksController {
  constructor(public booksService: BooksService) {}
  
  @Post('books')
  async addBooks( // Adding a book
    @Body('title') bookTitle: string,
    @Body('author') bookAuthor: Author,
    @Body('yearOfPublication') bookYP: string,
    @Body('description') bookDesc: string,
    @Body('stock') bookStock: number,
    @Body('stockStatus') bookStockStatus: string,
    @Body('stockHistory') bookStockHistory: number[],
  ){
    const feedback = await this.booksService.addBook(
      bookTitle,
      bookAuthor,
      bookYP,
      bookDesc,
      bookStock,
      bookStockStatus,
      bookStockHistory
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

  

  @Put('books/stock/:id')
  async updateStock(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto): Promise<Book> {
   const newStock = await this.booksService.updateStock(id, updateStockDto);
     return newStock;
  }

  
} 

