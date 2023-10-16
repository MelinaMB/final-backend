import express from "express";
import { cartViewController } from "../controllers/cartView.controller.js"

export const cartViewRouter = express.Router();

cartViewRouter.get('/carts/:cid', cartViewController.getCartById);