import { Injectable } from "@nestjs/common";

import {book} from './books.model';
import {authorObject} from './Authors/author.model';


export class booksService{
    books: book[] = [];

    addBook(title:string,author:object,firstName:string,lastName:string,email:string,dateOfBirth:Date, yearOfPublication:string, description:string){
        const bookId = new Date().toString()
        // const authorObj = new authorObject(firstName,lastName,email,dateOfBirth)
        // author = Object.assign(authorObj) 
        const newBook = new book(bookId,title, author,firstName,lastName,email,dateOfBirth, yearOfPublication, description);
        this.books.push(newBook);
        let creationMsg = "This book was added "

        // return bookId;
        return [creationMsg, newBook];
        
    }
}
