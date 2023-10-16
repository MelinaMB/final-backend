import { Schema, model } from 'mongoose';
// import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  purchaser: {
    type: String,
    require: true,
    max: 100,
  },
});

export const TicketModel = model('ticket', schema);
