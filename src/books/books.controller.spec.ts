
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { booksController } from './books.controller';
import { BooksService } from './books.service';

describe('AppController', () => {
  let controller: booksController;

  const mockBookService = {
    addBook:jest.fn((feedback) =>{
       return{
        id: Date.now(),
        ...feedback
       }
    })
  }

  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [booksController],
      providers: [BooksService],
    }).overrideProvider(BooksService).useValue(mockBookService).compile();

    controller = module.get<booksController>(booksController);

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
     "ISBN":"4658388-89532845-23898934"
  }

  it('should be defined',()=>{
    expect(controller).toBeDefined()
  });

  it('should add a book',()=>{
    expect(controller.addBook (
      mockBook.title,
      mockBook.author,
      mockBook.description,
      mockBook.yearOfPublication,
      mockBook.ISBN
   )).toEqual({
    id:expect.any(Number),
     mockBook
   })
  })

  expect(mockBookService.addBook).toHaveBeenCalled();

  
  
    it('should get all books', () => {
      expect(controller.getBooks()).toHaveProperty([])
  });

  it('should get a book', () => {
    expect(controller.getBook("randomId")).toHaveProperty("title")
 });

});
