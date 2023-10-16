import { Schema, model } from 'mongoose';
// import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
    
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
          },
          quantity: {type: Number, default: 1}
        },
      ],
      default: [],
    },
});

schema.pre('findOne', function () {
  this.populate('products.product');
});

schema.pre('find', function () {
  this.populate('products.product');
});
// schema.plugin(monsoosePaginate);
export const CartsModel = model('carts', schema);