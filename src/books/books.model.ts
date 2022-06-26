import * as mongoose from 'mongoose';

export const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: Object, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  yearOfation: { type: String, required: true },
  description: { type: String, required: true },
});

export interface Book {
  id: string;
  title: string;
  author: object; //Author object and it's elements.
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  yearOfation: string;
  description: string;
}
