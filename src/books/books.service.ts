import { Injectable, NotFoundException } from "@nestjs/common";

import {book} from './books.model';
// import {authorObject} from './Authors/author.model';

@Injectable()
export class booksService{
    books: book[] = [];

    addBook(title:string,author:object,firstName:string,lastName:string,email:string,dateOfBirth:Date, yearOfPublication:string, description:string){
        const bookId = Math.random().toString();
        // const authorObj = new authorObject(firstName,lastName,email,dateOfBirth)
        // author = Object.assign(authorObj) 
        const newBook = new book(bookId,title, author,firstName,lastName,email,dateOfBirth, yearOfPublication, description);
        this.books.push(newBook);
        let creationMsg = title + " was added "

        // return bookId;
        return [creationMsg, newBook];
        
    }

    getBooks(){
        return [...this.books];
      }


    getBook(bookId:string){
        const book = this.books.find((bk) => bk.id === bookId);
        if(!book) { // If book does not exist
            throw new NotFoundException('Could not find this book');
        }
        return{ ...book};

    }
}
