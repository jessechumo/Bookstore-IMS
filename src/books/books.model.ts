import * as mongoose from 'mongoose';

export const bookSchema = new mongoose.Schema({
  title: { type: String, required:true },
  author: { type: Object },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  dateOfBirth: { type: Date },
  description: { type: String},
  yearOfPublication: { type: String},
});

export interface Book {
  id: string;
  title: string;
  author: object; //Author object and it's elements.
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  yearOfPublication: string;
  description: string;
}
