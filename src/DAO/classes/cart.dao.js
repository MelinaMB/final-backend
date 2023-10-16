import { CartsModel } from '../models/carts.model.js';

export class CartModels {
  // crear cart
  async createCart(cartParaGuardar) {
    return CartsModel.create(cartParaGuardar);
  }
 //obtener todos los carts 
  async getAllCart() {
    let carts = await CartsModel.find({});
    console.log(JSON.stringify(carts, null, 4));
    return carts;
  }
  // obtener carrito por id
  async getCartById(_id) {
    let cart = await CartsModel.findOne({ _id: _id });
    console.log(JSON.stringify(cart, null, 4));
    return cart;
  }
  // actualizar carrito
  async updateCart(cartId, cartActualizado) {
    return await CartsModel.updateOne({ _id: cartId }, cartActualizado);
  }
}

export const cartModels = new CartModels();
