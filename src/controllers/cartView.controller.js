import { CartService } from '../services/carts.service.js'

const Service = new CartService();

class CartViewController {
    async getCartById(req, res){
        const cid = req.params.cid
        const carts = await Service.getCartById(cid);
        let cart = carts.products.map((doc) => {
            return {
                title: doc.product.title,
                price: doc.product.price,
                quantity: doc.quantity
            }
        })
        return res.render("carts", {cart : cart})
    }
}

export const cartViewController = new CartViewController();