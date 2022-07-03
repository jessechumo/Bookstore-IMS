import { Body, Controller, Post, Get, Param, Patch, Put } from '@nestjs/common';
import { Stock } from './stock.model';
import { StockService } from './stock.service';
import { UpdateStockDto } from './updateStock.dto';

@Controller('api')
export class stockController {
  constructor(public stockService: StockService) {}

  //Add stock
  @Post('stock')
  async addStock(
    @Body('ISBN') bookISBN: string,
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

  // Update stock
  @Put('stock/:id')
  async updateStock(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ): Promise<Stock> {
    const newStock = await this.stockService.updateStock(id, updateStockDto);
    return newStock;
  }
}
