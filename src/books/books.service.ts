import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, Stock} from './books.model';
import { Book } from './books.model';


@Injectable()
export class BooksService {
  public books: Book[] = [];

  constructor(
    @InjectModel('Book') public readonly bookModel: Model<Book>,
    ){}

  async addBook(
    title: string,
    author: Author, // Using Author interface defined in book.model file.
    // firstName: string,
    // lastName: string,
    // email: string,
    // dateOfBirth: Date,
    yearOfPublication: string,
    description: string,
    stock: Stock,
  ) {

    const newBook = new this.bookModel({
      // bookId,
      title,
      author,
      // firstName,
      // lastName,
      // email,
      // dateOfBirth,
      stock,
      yearOfPublication,
      description,
  });

    newBook.validateSync();
    const result = await newBook.save();
    let creationMsg = title + ' was succesfully added with the id below ';
    // return bookId;

    return [creationMsg, result.id as string];
  }

  async getBooks() {  // get all books
    const books = await this.bookModel.find().exec();
    return books as Book[];
  }

  async getBook(id: string):Promise<Book> { // get a single book
    let book;
    try{
      book = await this.bookModel.findById(id);
    } catch(error){
      throw new NotFoundException('The id you entered is invalid');
    }
     
    if (!book) {
      // If book does not exist
      throw new NotFoundException('This book does not exist in our inventory');
    }
    return book;
  }

  async getYOP(yearOfPublication:string):Promise<Book> { //GET books by year of publication.
    let book;
    try{
      book = await this.bookModel.find({"yearOfPublication":yearOfPublication})
    } catch(error){
      throw new NotFoundException('Enter a valid year');
    }
     
    if (!book) {
      // If book does not exist
      throw new NotFoundException('Books from this year do not exist');
    }
    return book;
  }


   // stoock code
  async updateStock(stock:number):Promise<Book>{
    let updatedStock; 
    try{
      updatedStock = await this.bookModel.find({"stock":stock})
    } catch(error){
      throw new NotFoundException('');
    }
     
    if (!updatedStock) {
      // If book does not exist
      throw new NotFoundException('');
    }
    return updatedStock;
  }

}

   

