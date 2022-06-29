import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { query } from 'express';
import { Model } from 'mongoose';
import { Book } from '../books/books.model';
import * as mongoose from 'mongoose';
import { bookSchema } from '../books/books.model';
import {BooksService} from '../books/books.service';

let book = mongoose.model("book",bookSchema)

@Injectable()
export class AuthorService {

  
  constructor(
    @InjectModel('Book') public readonly bookModel: Model<Book>,
    ){}

  async getAuthors(){
    const authors = await this.bookModel.find({},{'author':1,'_id':0});
    return authors;
  }

  async getAuthor(firstName:string):Promise<Book> {
    let author;
    try{
      author = await this.bookModel.find({"author.firstName":firstName},{'author':1,'_id':0})
    } catch(error){
      throw new NotFoundException('This author does not exist');
    }
     
    if (!author) {
      // If book does not exist
      throw new NotFoundException('This author does not exist');
    }
    return author;
  }
}