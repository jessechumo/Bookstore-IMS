import { Body, Controller, Post, Get, Param, Patch, Put } from '@nestjs/common';
import { Author, Book, Stock } from './books.model';
import { BooksService } from './books.service';
import { UpdateStockDto } from './updateStock.dto';

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

  // @Patch('books/stock/:id/')
  // async updateStock(@Param('id') bookId:string, @Param('value') value:number){
  //   const newStock = await this.booksService.updateStock(bookId,value)
  //   return newStock;
  // }

  @Patch('books/stock/:id')
  async updateStock(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto): Promise<Book> {
      return this.booksService.updateStock(id, updateStockDto);
  }

  // @Put('books/stock/:id')
  // async updateStock(@Param('id') bookId:string, @Body() updateStock:StockUpdateDto):Promise<Book>{ 
  //   return this.booksService.updateStock(bookId,updateStock)
  // }
  

  // @Patch('books/stock/:id') // using Patch instead of Put so as not to delete any field by mistake.
  // async updateStock(@Param('id') bookId:string,){  // update stock
  //   const updatedStock = await this.booksService.updateStock(bookId);
  //   return updatedStock;
  // }
  // updateStock(@Param('id') bookId:string, @Body){}
} 

