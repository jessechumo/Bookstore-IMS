import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { authorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { bookSchema } from "../books/books.model";

@Module({
    imports:[authorModule, MongooseModule.forFeature([{name:'Book', schema:bookSchema}])],
    controllers: [authorController],
    providers:[AuthorService],
})

export class authorModule {}
