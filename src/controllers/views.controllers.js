import { ViewsService } from '../services/view.service.js';
import { ProductModel } from '../DAO/models/products.model.js';
import UserService from '../services/users.service.js';
import { ProductService } from '../services/products.service.js';
import { productsController } from '../controllers/products.controller.js';
const ServiceUser = new UserService();
const Service = new ViewsService();
const ServiceProd = new ProductService();

class ViewsControllers {
  async getProducts(req, res) {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query ? { price: req.query.sort } : '';
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.title) {
      query.title = req.query.title;
    }
    if (req.query.description) {
      query.description = req.query.description;
    }
    if (req.query.price) {
      query.price = req.query.price;
    }
    const allProducts = await ProductModel.paginate(query, { limit, page, sort });
    const { docs, ...rest } = allProducts;
    const firstName = req.session.user.firstName;
    const rol = req.session.user.rol;
    const premium = req.session.user.premium;
    const isAdmin = req.session.user.isAdmin;

    let products = docs.map((doc) => {
      return {
        _id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        code: doc.code,
        price: doc.price,
        status: doc.status,
        stock: doc.stock,
        category: doc.category,
        thumbnails: doc.thumbnails,
      };
    });

    return res.render('products', { products, paginate: rest, firstName, rol, premium, isAdmin });
  }

  async products(req, res) {
    const user = { email: req.session.email };
    return res.render('products', { user });
  }

  async socket(req, res) {
    const products = Service.socket();
    return res.render('realTimeProducts', { products });
    socketServer.emit('msg_back_to_front', { products });
  }

  async getCartById(req, res, next) {
    try {
      const { cid } = req.params;
      const cart = await Service.getCartById(cid);
      res.render('carts', { cart: simplifiedCart });
    } catch (error) {
      req.logger.error({
        message: error.message,
      });
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { pid } = req.params;
      const productSimplificado = await Service.getProductById(pid);
      req.logger.info(productSimplificado);
      res.render('product', { product: productSimplificado });
    } catch (error) {
      req.logger.error({
        message: error.message,
      });
      next(error);
    }
  }

  async crearProducto(req, res) {
    res.render('crearProducto');
  }

  async home(req, res) {
    res.render('login');
  }

  async loginGit(req, res) {
    res.render('login-github');
  }

  async cabioDeRol(req, res) {
    const user = req.session.user._id;
    res.render('cambioDeRol', { user });
  }

  async admin(req, res) {
    const user = await ServiceUser.getAll();
    let users = user.map((doc) => {
      return {
        _id: doc._id.toString(),
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        age: doc.age,
        isAdmin: doc.isAdmin,
        rol: doc.rol,
        premium: doc.premium,
        ultimoLogging: doc.ultimoLogging,
      };
    });
    res.render('vistaAdmin', { users });
  }
// obtengo los productos del usuario que los creo, si es admin puede ver todos los productos
  async misProductos(req, res) {
    try {
      const user = req.session.user;
      const traerEmail = req.session.user.email;
      if (user.premium) {
        const listaDeProductosPremium = await ServiceProd.getProductByOwner(traerEmail);
        let products = listaDeProductosPremium.map((doc) => {
          return {
            _id: doc._id.toString(),
            title: doc.title,
            description: doc.description,
            code: doc.code,
            price: doc.price,
            status: doc.status,
            stock: doc.stock,
            category: doc.category,
            thumbnails: doc.thumbnails,
            owner: doc.owner,
          };
        });
        res.render('misProductos', { products })
      } else {
        const listaDeProductos = await ServiceProd.getAll();
        let products = listaDeProductos.map((doc) => {
          return {
            _id: doc._id.toString(),
            title: doc.title,
            description: doc.description,
            code: doc.code,
            price: doc.price,
            status: doc.status,
            stock: doc.stock,
            category: doc.category,
            thumbnails: doc.thumbnails,
            owner: doc.owner,
          };
        });
        res.render('misProductos', { products });
      }
    } catch (error) {
      req.logger.error({
        message: error.message,
      });
    }
  }
}

export const viewsController = new ViewsControllers();
