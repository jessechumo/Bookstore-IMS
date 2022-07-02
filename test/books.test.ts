// import { BooksService } from '../src/books/books.service';
// import { Book, Author, Stock} from '../src/books/books.model';
// import { UpdateStockDto } from '../src/books/updateStock.dto';
// import { booksController } from "../src/books/books.controller";

// describe('AppController (e2e)', () => {
//     let app: INestApplication;
  
//     beforeEach(async () => {
//       const moduleFixture: TestingModule = await Test.createTestingModule({
//         imports: [AppModule],
//       }).compile();
  
//       app = moduleFixture.createNestApplication();
//       await app.init();
//     });
  
//     it('/ (GET)', () => {
//       return request(app.getHttpServer())
//         .get('/api/books/:id')
//         .expect(200)
//         .expect(Object);
//     });
//   });