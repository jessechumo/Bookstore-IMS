import * as mongoose from 'mongoose';

// Defining schemas for mongo db
export const authorSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  dateOfBirth: { type: String },
});

export const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: authorSchema, required: true },
  yearOfPublication: { type: String, required: true },
  description: { type: String, required: true },
  ISBN: { type: String, required: true },
});

// Defining interface for book object
export interface Author {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

export interface Book {
  id: string;
  title: string;
  author: { [key: string]: Author }; // Using the earlier defined Author interface.
  yearOfPublication: string;
  description: string;
  ISBN: string;
}
