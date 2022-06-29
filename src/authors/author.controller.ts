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

  @Get(':firstName') // get a specific author.
    async getAuthor(@Param('firstName') firstName:string,){
        const singleAuthor = await this.authorService.getAuthor(firstName);
         return singleAuthor;
    }
  }


