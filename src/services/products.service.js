import { productsModels } from '../DAO/classes/products.dao.js';

export class ProductService {

  async getAll() {
    const products = await productsModels.getAll();
    return products;
  }

  async getProductLimit(prodlimit, page, sort, filtro) {
    const productLimit = await productsModels.getProductLimit(prodlimit, page, sort, filtro);
    return productLimit;
  }

  async getProductById(_id) {
    return await productsModels.getProductById(_id);
  }

  async getProductByOwner(owner) {
    return await productsModels.getProductByOwner(owner);
  }

  async createOne(product) {
    const prodCreated = await productsModels.createOne(product);
    return prodCreated;
  }

  async updateOne(_id, product) {
    if (!_id) throw new Error('invalid_id');
    const prodUpdate = await productsModels.updateOne(_id, product);
    return prodUpdate;
  }

  async deleteOne(_id) {
    const deleted = await productsModels.deleteOne(_id);
    return deleted;
  }
}

export const productService = new ProductService();
