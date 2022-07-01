import { Test, TestingModule } from '@nestjs/testing';
import { booksController } from './books.controller';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';

describe('BooksController',() => {
    let controller: booksController;
  

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
        //   controllers: [booksController],
          providers: [BooksService],
        }).compile();

        controller = module.get<booksController>(booksController);

})
})


it('should get all Books', async () => {
    expect(await booksController.getBooks()).toBe("")
  }) 