
import { IsNotEmpty, IsNumber, IsObject} from 'class-validator';


export class UpdateStockDto {
    @IsNotEmpty()
    @IsObject()
    stock:{
       
        value:number; 
    }
         

          
}