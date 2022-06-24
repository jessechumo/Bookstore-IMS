import { Module } from "@nestjs/common";
import { booksController } from "./books.controller";
import { booksService } from "./books.service";

@Module({
    imports:[booksModule],
    controllers: [booksController],
    providers:[booksService],
})

export class booksModule {}