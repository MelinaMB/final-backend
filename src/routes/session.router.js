import express from 'express';
import passport from 'passport';
import { sessionController } from '../controllers/session.controller.js';

export const sessionsRouter = express.Router();

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), sessionController.githubCallback);

sessionsRouter.get('/show', sessionController.show);
