import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, Author } from './books.model';

@Injectable()
export class BooksService {
  public books: Book[] = [];

  constructor(@InjectModel('Book') public readonly bookModel: Model<Book>) {}

  async addBook(
    title: string,
    author: Author, // Using Author interface defined in book.model file.
    yearOfPublication: string,
    description: string,
    ISBN: string,
  ) {
    const newBook = new this.bookModel({
      title,
      author,
      yearOfPublication,
      description,
      ISBN,
    });

    newBook.validateSync(); // validating newBook based on our bookSchema.

    await newBook.save(); // saving the data to the database.
    return [`${title} was succesfully added`, newBook];
  }

  // get all books
  async getBooks() {
    const books = await this.bookModel.find().exec();
    return books as Book[];
  }

  // get a single book by id
  async getBook(id: string): Promise<Book> {
    let book;
    try {
      book = await this.bookModel.findById(id);
    } catch (error) {
      throw new NotFoundException('The id you entered is invalid');
    }

    if (!book) {
      // If book does not exist
      throw new NotFoundException('This book does not exist in our inventory');
    }
    return book;
  }

  //GET books by year of publication.
  async getYOP(yearOfPublication: string): Promise<Book> {
    let book;
    try {
      book = await this.bookModel.find({
        yearOfPublication: yearOfPublication,
      });
    } catch (error) {
      throw new NotFoundException('Enter a valid year');
    }

    if (!book) {
      throw new NotFoundException(
        'Books from this year do not exist in our inventory',
      );
    }
    return book;
  }
}
