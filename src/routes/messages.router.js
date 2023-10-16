import express from "express";
import { messagesController } from '../controllers/messages.controller.js';
import { isUser } from "../middlewares/auth.js";

export const messagesRouter = express.Router();

messagesRouter.get('/', isUser, messagesController.getMessages);
