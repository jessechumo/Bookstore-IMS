import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('api')
export class stockController {
  constructor(public stockService: StockService) {}

  //Add stock
  @Post('stock')
  async addStock(
    @Body('ISBN') bookISBN : string,
    @Body('quantity') stockQuantity: number,
    @Body('status') stockStatus: string,
    @Body('history') stockHistory: Array<number>,
  
  ) {
    const feedback = await this.stockService.addStock(
      bookISBN,
      stockQuantity,
      stockStatus,
      stockHistory,
    );

    return feedback;
  }

  // get all stock
  @Get('stock')
  async getStocks() {
    const stocks = await this.stockService.getStocks();
    return stocks;
  }

  // get a single stock by ISBN
  @Get('stock/:ISBN')
  async getBook(@Param('ISBN') ISBN: string) {
    const stock = await this.stockService.getStock(ISBN);
    return stock;
  }

  // Update stock
  @Put('stock/:ISBN')
  async updateStock(
    @Body('ISBN') bookISBN: string,
    @Body('quantity') stockQuantity: number,
    @Body('status') stockStatus: string,
  ) {
      const feedback = await this.stockService.updateStock(bookISBN,stockQuantity,stockStatus);
      return feedback;
  }
}
