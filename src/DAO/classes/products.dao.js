import { ProductModel } from '../models/products.model.js';

export class ProductsModels {

  async getAll() {
    const products = await ProductModel.find({});
    return products;
  }

  async getProductLimit(prodlimit, page, sort, filtro) {
    const prod = await ProductModel(prodlimit, page, sort, filtro);
    return prod;
  }

  async getProductById(_id) {
    return await ProductModel.findOne({ _id: _id });
  }

  async getProductByOwner(owner) {
    return await ProductModel.find({owner: owner});
  }

  async createOne(product) {
    const prodCreated = await ProductModel.create(product);
    return prodCreated;
  }

  async updateOne(_id, product) {
    const prodUpdate = await ProductModel.updateOne({ _id: _id }, product);
    return prodUpdate;
  }

  async deleteOne(_id) {
    const deleted = await ProductModel.deleteOne({ _id: _id });
    return deleted;
  }
}

export const productsModels = new ProductsModels();
