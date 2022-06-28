import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('authors')
export class authorController {
  constructor(public authorService: AuthorService) {} 

  @Get()
  async getAuthors(){ // get all authors.
    const authors = await this.authorService.getAuthors();
    return authors;
  }

  @Get(':author') // get a specific author.
    async getAuthor(@Param('id') author:string,){
        const singleAuthor = await this.authorService.getAuthor(author);
         return singleAuthor;
    }
  }


