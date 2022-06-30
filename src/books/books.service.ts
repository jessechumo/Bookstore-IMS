import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, Stock} from './books.model';
import { Book } from './books.model';
import { UpdateStockDto } from './updateStock.dto';


@Injectable()
export class BooksService {
  public books: Book[] = [];

  constructor(
    @InjectModel('Book') public readonly bookModel: Model<Book>,
    ){}

  async addBook(
    title: string,
    author: Author, // Using Author interface defined in book.model file.
    yearOfPublication: string,
    description: string,
    stock: Stock,
  ) {

    const newBook = new this.bookModel({
      title,
      author,
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


   // stock method
  //  async updateStock(id:string, value:number){
  //   const updatedStock = await this.bookModel.updateOne ({"_id": id}, { '$set': {"stock.value" : value} });
  //   const newStock = await this.bookModel.findById(id);
  //   return ["Stock was updated", newStock, updatedStock];
  //  }


  
   // stock method
  //  async updateStock(id:string, value:number){
  //   const updatedStock = await this.bookModel.findByIdAndUpdate(id,{"stock.value":value},{new:true})
  //   return ["Stock was updated", updatedStock];
  //  }

   async updateStock(id: string, stockUpdates: UpdateStockDto): Promise<Book> {
    const updatedStock = this.bookModel.findOneAndUpdate({id},stockUpdates,{new:true});
    // let stockValue = await this.bookModel.find({ _id:id},{"stock.value":1, _id:0 })
    // stockValue = parseInt(stockValue)
    // if(stockValue == 0){
    //   const stockStatus= await this.bookModel.findByIdAndUpdate(id,{"stock.status":"Out Of Stock"},{new:true})
    // }
    // if(stockValue >0 &&){
    //   const stockStatus= await this.bookModel.findByIdAndUpdate(id,{"stock.status":"Out Of Stock"},{new:true})
    // }  
    return updatedStock;
 }



  
  // async updateStock(id:string,data):Promise<Book> { // get a single book
  //   return this.bookModel.findByIdAndUpdate(id,data,{new:'true'};
  //   let updatedStock; 
  //     try{
  //       updatedStock = await this.bookModel.findByIdAndUpdate(id)
  //     } catch(error){
  //       throw new NotFoundException('Enter a valid id');
  //     }
       
  //     if (!updatedStock) {
  //       // If book does not exist
  //       throw new NotFoundException('This book does not exist');
  //     }
  //     return updatedStock;
  //   }

}

   

