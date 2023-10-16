//@ts-check
import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  age: {
    type: Number,
    required: false,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    max: 100,
  },
  cart: {
    type: String,
    required: false,
    max: 100,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  rol: {
    type: String,
    required: true,
    default: "user",
  },
  premium: {
    type: Boolean,
    default: false,
  },
  ultimoLogging: {
    type: Date,
    default: true,
  }
});
schema.plugin(monsoosePaginate);
export const UserModel = model('users', schema);