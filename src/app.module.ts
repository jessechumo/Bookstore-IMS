import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { booksModule } from './books/books.module';
import {MongooseModule} from '@nestjs/mongoose';
import { authorModule } from './authors/author.module';





@Module({
  imports: [authorModule,booksModule, MongooseModule.forRoot('mongodb+srv://test:123456789password@cluster0.eawpi.mongodb.net/bookstoreIMS?retryWrites=true&w=majority')], // Database ConnectionString
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}

