import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  title: {
    type: String,
    required: true,
    max: 100,
  },
  description: {
    type: String,
    required: true,
    max: 100,
  },
  code: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    
  },
  status: {
    type: String,
    required: true,
    max: 100,
  },
  stock: {
    type: Number,
    required: true,
    
  },
  category: {
    type: String,
    required: true,
    max: 100,
  },
  thumbnails: {
    type: Array,
    required: true,
    max: 100,
  },
  owner: {
    type: String,
    default: 'admin',
  }
});

schema.plugin(monsoosePaginate);

export const ProductModel = model('products', schema);