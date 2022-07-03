import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { stockController } from "./stock.controller";
import { stockSchema } from "./stock.model";
import { StockService } from "./stock.service";

@Module({
    imports:[stockModule, MongooseModule.forFeature([{name:'Stock', schema:stockSchema}])],
    controllers: [stockController],
    providers:[StockService],
})

export class stockModule {}