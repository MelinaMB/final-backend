import fs from 'fs';
import ProductManager from './ProductManager.js'

class CartManager {

    constructor() {
        this.path = './src/cart.json';
        this.productManager = new ProductManager();
    }
    async getCart() {
        try {
            
            if (fs.existsSync(this.path)) {
                
                const data = await fs.promises.readFile(this.path, 'utf-8');
               
                return JSON.parse(data);
            }
           
            await fs.promises.writeFile(this.path, JSON.stringify([]))
            return [];
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async createCart() {
        try {
            const carts = await this.getCart();
            const id = (Math.random() * 100000000).toFixed(0).toString();
            const newCart = {
                id,
                products: []
            };
            carts.push(newCart);
            fs.promises.writeFile(this.path, JSON.stringify(carts));
            return newCart;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async getCartById(cartId) {
        try {
            const carts = await this.getCart();
            const encontrar = carts.find((cart) => cart.id === cartId)
            if (!encontrar) {
                throw new Error('cart not found');
            }
            return encontrar
        } catch (error) {
            console.log(error);
            throw new Error('cart not found');
        }
    }

    async postProductById(cartId, productId) {

        const carts = await this.getCart();
        const cart = carts.find((cart) => cart.id === cartId);
        if (cart) {
            const products = await this.productManager.getProduct();
            const encontrarProduct = products.find((producto) => producto.id == productId);
            if (encontrarProduct) {
                const prodCartExists = cart.products.find((prod) => prod.id == productId);
                if (prodCartExists) {
                    prodCartExists.quantity++;
                } else {
                    cart.products.push({
                        id: productId, quantity: 1
                    });
                }
                const cartsJson = JSON.stringify(carts);
                await fs.promises.writeFile(this.path, cartsJson);
                return cart.products;
            } else {
                throw new Error('product not found');
            }

        } else {
            throw new Error('cart not found');
        }

    }
}

const cartManager = new CartManager();

const asyncFn = async () => {
    // console.log(await cartManager.createCart());
};
asyncFn();

export default CartManager;