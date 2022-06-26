import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { booksModule } from './books/books.module';
import {MongooseModule} from '@nestjs/mongoose';
// import dotenv from 'dotenv'

require('dotenv').config()
@Module({
  imports: [booksModule, MongooseModule.forRoot('mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eawpi.mongodb.net/bookstoreIMS?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

