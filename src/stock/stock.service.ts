import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from './stock.model';
import { UpdateStockDto } from './updateStock.dto';

@Injectable()
export class StockService {
  constructor(@InjectModel('Stock') public readonly StockModel: Model<Stock>) {}

  //Add stock
  async addStock(
    ISBN: string,
    quantity: number, // Using Author interface defined in book.model file.
    status: string,
    history: Array<number>,
  ) {
    const newStock = new this.StockModel({
      ISBN,
      quantity,
      status,
      history,
    });

    // dynamically setting the stock status
    if (newStock.quantity === 0) newStock.status = 'out of stock';
    else if (newStock.quantity > 0 && newStock.quantity <= 5)
      newStock.status = 'Critical';
    else if (newStock.quantity > 5 && newStock.quantity <= 10)
      newStock.status = 'Bad';
    else if (newStock.quantity > 10) newStock.status = 'Good';

    // adding current quantity to the history array
    newStock.history.length = 0;
    newStock.history.push(newStock.quantity);

    newStock.validateSync(); // validating newBook based on our bookSchema.
    await newStock.save(); // saving the data to the database.
    return ['Stock was successfully added', newStock];
  }

  // Update stock
  async updateStock(id: string, stockUpdates: UpdateStockDto): Promise<Stock> {
    await this.StockModel.findByIdAndUpdate(id, stockUpdates, { new: true });
    let newStock = await this.StockModel.findById(id, { stock: 1 });

    // await this.StockModel.updateOne(
    //   { ISBN: ISBN  },
    //   { $set: { stockHistory: newStock.quantity } },
    // );

    // if (newStock.quantity === 0)
    //   await this.StockModel.updateOne(
    //     { ISBN: ISBN  },
    //     { $set: { status: 'out of stock' } },
    //   );
    // else if (newStock.quantity > 0 && newStock.quantity <= 5)
    //   await this.StockModel.updateOne(
    //     { ISBN: ISBN  },
    //     { $set: { status: 'Critical' } },
    //   );
    // else if (newStock.quantity > 5 && newStock.quantity <= 10)
    //   await this.StockModel.updateOne(
    //     { ISBN: ISBN  },
    //     { $set: { status: 'Bad' } },
    //   );
    // else if (newStock.quantity > 10)
    //   await this.StockModel.updateOne(
    //     { ISBN: ISBN  },
    //     { $set: { status: 'Good' } },
    //   );

    const updatedStock = await this.StockModel.findById(id, { __v: 0 });
    return updatedStock;
  }
}
