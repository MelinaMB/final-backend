import CustomError from '../errors/custom-error.js';
import EErros from '../errors/enums.js';
import UserService from '../services/users.service.js';
import nodemailer from "nodemailer";
import { __dirname } from "../../src/utils.js";
import dotenv from 'dotenv';
import { userDTO } from '../DAO/DTO/user.dto.js';

dotenv.config();

const Service = new UserService();

class UsersController {
  // traer todos los usuarios
  async getAll(req, res) {
    const users = await Service.getAll();
    const listaDeUsuariosDto = [];
    users.forEach(usuario => {
      const informacionUser = new userDTO(usuario);
      listaDeUsuariosDto.push(informacionUser);
    })
    
    res.status(200).json({ users: listaDeUsuariosDto }); 
  }
  // traer todos los usuarios por id
  async getUser(req, res) {
    try {
      const userId = req.params.user._id;
      res.status(200).json({ user: userId });
    } catch (error) {
      res.status(404).json({ message: 'user not found' });
      req.logger.info({
        message: error.message,
      });
    }
  }
  // terminar la sesion
  async logOut(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
      }
      return res.redirect('/api/user/login');
    });
  }

  async perfil(req, res) {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin };
    return res.render('perfil', { user: user });
  }

  async login(req, res) {
    return res.render('login', {});
  }

  async loginAutenticate(req, res) {
    if (!req.user) {
      return res.json({ error: 'invalid credentials' });
    }
    
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isAdmin: req.user.isAdmin,
      rol: req.user.rol,
      age: req.user.age,
      cart: req.user.cart,
      premium: req.user.premium,
      ultimoLogging: req.user.ultimoLogging,
    };

    return res.redirect('/products');
  }

  async register(req, res) {
    return res.render('register', {});
  }

  async registerAutenticate(req, res, next) {
    try {
      req.session.user = {
        _id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        isAdmin: req.user.isAdmin,
        rol: req.user.rol,
        age: req.user.age,
        premium: req.user.premium,
        cart: req.user.cart,
        ultimoLogging: req.user.ultimoLogging,
      };

      if (!req.user.firstName || !req.user.lastName || !req.user.email || !req.user.age != 0) {
        CustomError.createError({
          name: 'User creation error',
          cause: 'error por falta de datos',
          message: 'Error trying to create user',
          code: EErros.REGISTER_ERROR,
        });
      } else {
        return res.redirect('/products');
      }
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
      next(error);
    }
  }

  async session(req, res) {
    return res.send(JSON.stringify(req.session));
  }

  async userPremium(req, res) {
    try {
      const idUser = req.params.uid || req.session.user._id.toString();
      const user = await Service.userPremium(idUser);
      res.status(200).json(user);
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
    }
  }
// eliminar el usuario
  async eliminarUser(req, res) {
    try {
      const user = req.params.uid;
      const encontar = await Service.getUserById(user);
      if(user){
        const eliminarUser = await Service.deletedOne(user);
      }
      res.status(200).json('usuario eliminado');
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
    }
  }
// elimina a un usuario despues de no tener actividad por dos dias
  async deleteUserPorDate(req, res) {
    try {
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - 2);
       const listaDeUsuarioSinActividad = await Service.find({ultimoLogging: {$lt: fechaLimite}});
        
        if(listaDeUsuarioSinActividad) {  
           await Service.deleted(listaDeUsuarioSinActividad);
          // lleva notificacion de mail
          listaDeUsuarioSinActividad.forEach(usuario => {
            const transport = nodemailer.createTransport({
              service: "gmail",
              port: 587,
              auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASS,
              },
            });
    
            const result = transport.sendMail({
              from: process.env.GOOGLE_EMAIL,
              to: `${usuario.email}`,
              subject: "ecommerce",
              html: `
                        <div>
                            <h1>Tu usuario fue borrado por inactividad</h1>
                        </div>
                    `,
            });
    
            console.log(result);
            res.write("Email sent");
          })
      };  
    } catch (error) {
      req.logger.warn({
        message: error.message,
      });
    }
  }

}

export const usersController = new UsersController();
