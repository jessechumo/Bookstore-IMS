
import { IsNotEmpty, IsNumber } from 'class-validator';


export class UpdateStockDto {
    @IsNotEmpty()
    @IsNumber()

    stock:number

    stockStatus:string
    stockHistory:number[]
      
} 

// stockHistory:Array<number>  