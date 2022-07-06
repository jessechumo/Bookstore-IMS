import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the bookstore inventory management system! Please navigate to /api to view the documentation';
  }
}
