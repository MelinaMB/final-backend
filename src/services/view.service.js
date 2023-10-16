import viewsModels from '../DAO/classes/views.dao.js';
import { CartService } from '../services/carts.service.js';
import { ProductService } from '../services/products.service.js';

const Models = new viewsModels();

const cartService = new CartService();

const productService = new ProductService();

export class ViewsService {
  async socket() {
    const products = await Models.socket();
    return products;
  }

  async getCartById(cid) {
    const cart = await cartService.getCartById(cid);
    cart.products.map((item) => {
      return {
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      };
    });
  }

  async getProductById(pid) {
    const product = await productService.getProductById(pid);
    const productSimplificado = {
      _id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnails,
      code: product.code,
      stock: product.stock,
      category: product.category,
      owner: product.owner,
    };
    
    return productSimplificado;
  }
}
