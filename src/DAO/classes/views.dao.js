import ProductManager from "../ProductManager.js";
const productManager = new ProductManager();

class viewsModels {
    async socket(){
        const products = await productManager.getProduct();
        return products;
    }
}

export default viewsModels;