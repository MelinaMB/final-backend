import express from 'express';
import passport from 'passport';
import { usersController } from '../controllers/users.controllers.js';
import { isUser } from '../middlewares/auth.js';

export const userRouter = express.Router();

userRouter.get('/', usersController.getAll);

userRouter.get('/user/ui', usersController.getUser);

userRouter.get('/logout', usersController.logOut);

userRouter.get('/perfil', isUser, usersController.perfil);

// vista del login
userRouter.get('/login', usersController.login);

userRouter.post('/login', passport.authenticate('login'), usersController.loginAutenticate);

//   vista de regitro
userRouter.get('/register', usersController.register);

userRouter.post('/register', passport.authenticate('register'), usersController.registerAutenticate);

userRouter.get('/session', usersController.session);

userRouter.put('/premium/:uid', usersController.userPremium);

userRouter.delete('/eliminarUser/:uid', usersController.eliminarUser);

userRouter.delete('/delete', usersController.deleteUserPorDate);


