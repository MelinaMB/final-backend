import { productsModels } from '../DAO/classes/products.dao.js';
import { cartModels } from '../DAO/classes/cart.dao.js';
import { ProductService } from './products.service.js';
import { TicketService } from './ticket.service.js';


const productService = new ProductService();
const ticketService = new TicketService();

export class CartService {
  // crear carrito
  async createCart() {
    const created = cartModels.createCart({
      products: [],
      quantity: 1,
    });
    return created;
  }
  // obtener todos los carrito
  async getAllCart() {
    return await cartModels.getAllCart();
  }
  // post product en el carrito
  async postProdInCart(cartId, productId, email) {
    let cart = await this.getCartById(cartId);
    let product = await productsModels.getProductById(productId);
    if(product.owner == email){
      throw new Error('No puedes agregar este producto a tu carrito porque es tu producto');
    };
    if (cart) {
      if (product) {
        const prodCart = cart.products.find((prod) => prod.product.id == productId);
        if (prodCart) {
          prodCart.quantity++;
        } else {
          cart.products.push({ product: productId, quantity: 1 });
        }
      }
    }

    return await cartModels.updateCart(cartId, cart);
  }
  // obtener carrito por id
  async getCartById(_id) {
    return await cartModels.getCartById(_id);
  }
  // borrar un producto del carrito por id
  async deleteOneProductById(cid, pid) {
    let cart = await cartModels.getCartById(cid);
    const productosFiltrados = cart.products.filter((prod) => {
      return prod.product.id != pid
    });
    cart.products = productosFiltrados;
    return await cartModels.updateCart(cid, cart);
  }

   // borrar un producto del carrito por id
   async deleteProductsById(cid, products) {
    let cart = await cartModels.getCartById(cid);
    let productosFiltrados = cart.products;
    products.forEach(prod => {
      productosFiltrados = productosFiltrados.filter((item) => {
        return item.product.id != prod.product.id;
      });
    });
    cart.products = productosFiltrados;
    return await cartModels.updateCart(cid, cart);
  }

  // borrar todos los productos
  async deleteProducts(cartId) {
    return await cartModels.updateCart(cartId, { products: [] });
  }
  // update carrito por id de carrito
  async updateCart(cartId, cart) {
    return await cartModels.updateCart(cartId, cart);
  }
  // update la cantidad de un producto en el carrito
  async updateCartProdQuantity(cartId, productId, quantity) {
    let cart = await this.getCartById(cartId);
    if (cart) {
      let product = await productsModels.getProductById(productId);
      if (product) {
        const prodCart = cart.products.find((prod) => prod.product.id == productId);
        if (prodCart) {
          prodCart.quantity = quantity;
          cart = await cartModels.updateCart(cartId, cart);
        }
      }
    }

    return cart;
  }

  async generatePurchase(cartId, userId) {
    // obtengo el carrito
    let cart = await this.getCartById(cartId);

    const prodWithStock = [];
    const prodWithOutStock = [];

    if (cart) {
      // chequear que cada producto del carrito tenga stock y si tiene stock lo resto del stock total del producto.
      // armar una lista de productos sin stock y armo otra lista de producto con stock
      for (const item of cart.products) {
        let prod = await productService.getProductById(item.product.id);
        if (prod && prod.stock >= item.quantity) {
         prod.stock = prod.stock - item.quantity

          productService.updateOne(prod.id, prod, prod.stock);

          prodWithStock.push(item);
        } else {
          prodWithOutStock.push(item);

          // Agregas la lista de productos sin stock a la respuesta del servicio

        }
      }
      // Chequeo que la cantidad de elementos de la lista con stock sea mayor 0 y genero el ticket.
      // borro los productos que tienen stock y actualizo el carrito dejando solo los productos sin stock 
      if (prodWithStock.length > 0) {

        const ticket = await ticketService.createOne(prodWithStock, userId);
        if (ticket) {
          this.deleteProductsById(cartId, prodWithStock);
        }
        // Agrego el ticket a la respuesta del servicio
        return ticket;
      }
    }
    return null;
  }

}

export const cartService = new CartService();
