import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, Author } from './books.model';
import { UpdateStockDto } from './updateStock.dto';

@Injectable()
export class BooksService {
  public books: Book[] = [];

  constructor(@InjectModel('Book') public readonly bookModel: Model<Book>) {}

  async addBook(
    title: string,
    author: Author, // Using Author interface defined in book.model file.
    yearOfPublication: string,
    description: string,
    stock: number,
    stockStatus: string,
    stockHisory: number[],
  ) {
    const newBook = new this.bookModel({
      title,
      author,
      yearOfPublication,
      description,
      stock,
    });


    
    newBook.validateSync();
    const result = await newBook.save(); // saving the data to the database.
    let creationMsg = title + ' was succesfully added';
    

    
    

    // Dynamically assigning stockStatus based on the stock value.
    if (result.stock === 0)
      await this.bookModel.updateOne(
        { _id: result.id },
        { $set: { stockStatus: 'out of stock' } },
      );

    else if (result.stock > 0 && result.stock <= 5)
      await this.bookModel.updateOne(
        { _id: result.id },
        { $set: { stockStatus: 'Critical' } },
      );

    else if (result.stock > 5 && result.stock <= 10)
      await this.bookModel.updateOne(
        { _id: result.id },
        { $set: { stockStatus: 'Bad' } },
      );

    else if (result.stock > 10)
      await this.bookModel.updateOne(
        { _id: result.id },
        { $set: { stockStatus: 'Good' } },
      );

      let arr = await this.bookModel.updateOne(
        {_id:result.id},
        { $set: { stockHistory:[1] } });

      

      
        

      console.log(arr)
      console.log(result.stock)

    // updated book with dynamically set stockStatus
    const updatedBook = await this.bookModel.findById(result.id, { __v: 0 });
    return [creationMsg, updatedBook];
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
      throw new NotFoundException('Books from this year do not exist in our inventory');
    }
    return book;
  }



  // stock method
  async updateStock(id: string, stockUpdates: UpdateStockDto): Promise<Book> {
    await this.bookModel.findByIdAndUpdate(id, stockUpdates, { new: true });
    let newStock = await this.bookModel.findById(id, { stock: 1 });

   

     await this.bookModel.updateOne({_id:id}, { $set: { stockHistory:newStock.stock } });
    
    


    
    if (newStock.stock === 0)
      await this.bookModel.updateOne(
        { _id: id },
        { $set: { stockStatus: 'out of stock' } },
      );
    else if (newStock.stock > 0 && newStock.stock <= 5)
      await this.bookModel.updateOne(
        { _id: id },
        { $set: { stockStatus: 'Critical' } },
      );
    else if (newStock.stock > 5 && newStock.stock <= 10)
      await this.bookModel.updateOne(
        { _id: id },
        { $set: { stockStatus: 'Bad' } },
      );
    else if (newStock.stock > 10)
      await this.bookModel.updateOne(
        { _id: id },
        { $set: { stockStatus: 'Good' } },
      );

    const updatedStock = await this.bookModel.findById(id ,{__v: 0});
    return updatedStock;
  }
}
