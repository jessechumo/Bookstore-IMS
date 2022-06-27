import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './books.model';
// import {authorObject} from './Authors/author.model';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
    ){}

  async addBook(
    title: string,
    author: object,
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: Date,
    yearOfPublication: string,
    description: string,
  ) {
    // let bookId = Math.random().toString();

    // stock code
    // let stock = 0;
    // if (title) {
    //   const counts = {};
    //   const booksArray = [...this.books]
    //   booksArray.forEach(function (x) {
    //     counts[x] = (counts[x] || 0) + 1;
    //   });
    //   console.log(counts);
    // }

    // const stock = (title) => if;
   
    const newBook = new this.bookModel({
      // bookId,
      title,
      author,
      firstName,
      lastName,
      email,
      dateOfBirth,
      yearOfPublication,
      description,
  });
    const result = await newBook.save();
    let creationMsg = title + ' was succesfully added with the id below ';
    // return bookId;
    return [creationMsg, result.id as string];
  }

  async getBooks() {
    const books = await this.bookModel.find().exec();
    return books as Book[];
  }

  async getBook(id: string):Promise<Book> {
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
}
