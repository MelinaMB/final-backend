import express from "express";
import { cartController } from "../controllers/cart.controller.js";
import { isUser } from "../middlewares/auth.js";

export const cartsRouter = express.Router();

cartsRouter.post("/", cartController.createCart);

cartsRouter.get("/", cartController.getAllCart);

cartsRouter.get("/user", cartController.getUserCart);

cartsRouter.get("/:cid", cartController.getCartById);

cartsRouter.post("/:cid/product/:pid", isUser, cartController.postProdByIdInCart);

cartsRouter.delete("/:cid/product/:pid", cartController.deleteProdByIdInCart);

cartsRouter.delete("/:cid", cartController.deleteProductById);

cartsRouter.put('/:cid', cartController.updateCartById)

cartsRouter.put('/:cid/products/:pid', cartController.updateCartQuantity)

cartsRouter.post("/:cid/purchase", cartController.createPurchase)

