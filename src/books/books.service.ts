import { Injectable } from "@nestjs/common";

import {book} from './books.model';

export class booksService{
    books: book[] = [];

    addBook(title:string,author:string, year_of_publication:string, description:string){
        const bookId = new Date().toString()
        const newBook = new book(bookId,title, author, year_of_publication, description);
        this.books.push(newBook);

        return bookId;
    }
}