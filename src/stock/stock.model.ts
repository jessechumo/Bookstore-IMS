import * as mongoose from 'mongoose';

// Defining schema for mongo db
export const stockSchema = new mongoose.Schema({
  ISBN:{ type: String, required: true  },
  quantity: { type: Number , required: true },
  status: { type: String  },
  history: { type: Array  },
}
);

// Defining interface for stock object
export interface Stock {
  ISBN: string;
  quantity: number;
  status: string;
  history: Array<number>;
}
