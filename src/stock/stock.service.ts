import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from './stock.model';

@Injectable()
export class StockService {
  constructor(@InjectModel('Stock') public readonly StockModel: Model<Stock>) {}

  //Add stock
  async addStock(
    ISBN: string,
    quantity: number, // Using Author interface defined in stock.model file.
    status: string,
    history: Array<number>,
  ) {
    const Stock = new this.StockModel({
      ISBN,
      quantity,
      status,
      history,
    });

    stockStatus(Stock); //dynamically setting stock status

    // adding current quantity to the history array
    Stock.history.length = 0;
    Stock.history.push(Stock.quantity);

    Stock.validateSync(); // validating newstock based on our stockSchema.
    await Stock.save(); // saving the data to the database.
    return ['Stock was successfully added', Stock];
  }

  //get all stock
  async getStocks() {
    const stocks = await this.StockModel.find().exec();
    return stocks as Stock[];
  }

  // get a single stock by ISBN
  async getStock(ISBN: string): Promise<Stock> {
    let stock;
    try {
      stock = await this.StockModel.findOne({ ISBN: ISBN });
    } catch (error) {
      throw new NotFoundException('The ISBN you entered is invalid');
    }

    if (!stock) {
      // If stock does not exist
      throw new NotFoundException('This stock does not exist in our inventory');
    }
    return stock;
  }

  // Update stock
  async updateStock(
    ISBN: string,
    quantity: number, // Using Author interface defined in stock.model file.
    status: string,
  ) {
    // await this.StockModel.findOneAndUpdate({ISBN:ISBN},{ new: true });
    let Stock = {
      ISBN,
      quantity,
      status,
    };

    await stockStatus(Stock);
    await this.StockModel.findOneAndUpdate(
      { ISBN: ISBN },
      {
        $set: {
          quantity: quantity,
          status: Stock.status,
        },
        $push: { history: quantity },
      },
    );

    return this.StockModel.findOne({ ISBN: ISBN }, { _id: 0, __v: 0 });
  }
}

// dynamically setting the stock status
function stockStatus(Stock) {
  if (Stock.quantity === 0) Stock.status = 'out of stock';
  else if (Stock.quantity > 0 && Stock.quantity <= 5) Stock.status = 'Critical';
  else if (Stock.quantity > 5 && Stock.quantity <= 10) Stock.status = 'Bad';
  else if (Stock.quantity > 10) Stock.status = 'Good';
}
