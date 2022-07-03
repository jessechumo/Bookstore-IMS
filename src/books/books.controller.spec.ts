// import { Test, TestingModule } from '@nestjs/testing';
// import { booksController } from './books.controller';
// import { BooksService } from './books.service';
// import { getModelToken } from '@nestjs/mongoose';
// import * as request from 'supertest';
// import { INestApplication } from '@nestjs/common';
// import { AppModule } from 'src/app.module';
// import mongoose from 'mongoose';
// import {Book} from './books.model'

// jest.setTimeout(50000);

// describe('BooksController',() => {
//     // let controller: booksController;
//     let app: INestApplication;
//     // __esModule : true

//     beforeEach(async () => {

//         const moduleFixture : TestingModule = await Test.createTestingModule({
//           imports : [AppModule],
//           controllers: [booksController],
//           providers: [BooksService],
//         }).compile();

//         app = moduleFixture.createNestApplication();
//         await app.init();
//     });
//         afterAll(()=> mongoose.disconnect());

//         const mockBook = {
//           "title":"C and C++",
//           "author":{
//               "firstName":"Vinu",
//               "lastName":"vii",
//               "email":"vinuv@gmail.com",
//               "dateOfBirth":"21-12-1967"
//           },
//           "description":"become an ace in data structures today",
//           "yearOfPublication":"2008",
//            "stock":7
//       }

//       it('Should add a new book', () =>{
//         return request(app.getHttpServer())
//         .post('/api/books')
//         .send(mockBook)
//         .expect(201)
//       });
  
            
// })




// it('should get all Books', async () => {
//     expect(await booksController.getBooks()).toBe("")
//   }) 


import { Test, TestingModule } from '@nestjs/testing';
import { booksController } from './books.controller';
import { BooksService } from './books.service';
import { Author, Book,} from './books.model';
import * as  request  from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('AppController', () => {
  let BooksController: booksController;
  let app:INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [booksController],
      providers: [BooksService],
    }).compile();

    app = moduleFixture.createNestApplication()
    await app.init()

    BooksController = app.get<booksController>(booksController);
  });

  
;

  const mockBook ={
    "title":"C and C++",
    "author":{
        "firstName":"Vinu",
        "lastName":"vii",
        "email":"vinuv@gmail.com",
        "dateOfBirth":"21-12-1967"
    },
    "description":"become an ace in data structures today",
    "yearOfPublication":"2008",
     "stock":7
  }

  describe('root', () => {
    it('should get all books', () => {
      return request(app.getHttpServer())
      .get('/api/books')
      .expect(200)
      
    });
  });

});
