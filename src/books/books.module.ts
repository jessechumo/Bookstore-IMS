import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { booksController } from "./books.controller";
import { bookSchema } from "./books.model";
import { BooksService } from "./books.service";

@Module({
    imports:[booksModule, MongooseModule.forFeature([{name:'Book', schema:bookSchema}])],
    controllers: [booksController],
    providers:[BooksService],
})

export class booksModule {}
