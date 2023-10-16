import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { isAdminOPremium } from '../middlewares/auth.js';
import { uploader } from '../utils.js';

export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAll);

productsRouter.get('/', productsController.getProductLimit);

productsRouter.get('/:pid', productsController.getProductById);

productsRouter.post('/', isAdminOPremium,  uploader.single('thumbnails'), productsController.createOne);

productsRouter.put('/:pid', isAdminOPremium, productsController.updateOne);

productsRouter.delete('/:pid', isAdminOPremium, productsController.delete);

productsRouter.get('/owner/:email', productsController.getProductByOwner);

productsRouter.get('/products/mockingproducts', productsController.mocking);
