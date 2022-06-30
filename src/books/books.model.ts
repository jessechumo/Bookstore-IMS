import * as mongoose from 'mongoose';


// Defining schemas for mongo db
export const authorSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  dateOfBirth: { type: String //Date,
    //min: '1010-01-01',  // Defining  the minimum and maximum date of birth.
    //max: '2010-01-01'
   }
})

const stockSchema = new mongoose.Schema({
  value:{type:Number},
  status:{type:String}
})

export const bookSchema = new mongoose.Schema({
  title: { type: String, required:true },
  author: {type: authorSchema, required:true },
  description: { type: String, required:true },
  yearOfPublication: { type: String, required:true },
  stock:{type:stockSchema},
 
});


// Defining interface for book object
export interface Author {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}
export interface Stock {
  value:number;
  status:string;
}
export interface Book {
  id: string;
  title: string;
  author: {[key:string]:Author}  // Using the earlier defined Author interface.
  yearOfPublication: string;
  description: string;
  stock: {[key:string]:Stock}
}
