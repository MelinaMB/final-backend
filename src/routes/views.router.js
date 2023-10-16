import express from "express";
import { viewsController } from "../controllers/views.controllers.js";
import { isAdmin, isAdminOPremium } from "../middlewares/auth.js";

export const viewsRouter = express.Router();

viewsRouter.get('/products', viewsController.getProducts);

viewsRouter.get('/products', viewsController.products);

viewsRouter.get('/realTimeProducts', viewsController.socket);

viewsRouter.get("/carts/:cid", viewsController.getCartById);

viewsRouter.get("/products/:pid", viewsController.getProductById);

viewsRouter.get("/", viewsController.home);

viewsRouter.get('/crearProducto', viewsController.crearProducto);

viewsRouter.get('/logingit', viewsController.loginGit);

viewsRouter.get('/cambioDeRol', viewsController.cabioDeRol);

viewsRouter.get('/admin', isAdmin, viewsController.admin);

viewsRouter.get('/misProductos', isAdminOPremium, viewsController.misProductos);


