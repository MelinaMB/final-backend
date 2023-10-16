import express from "express";
import { ticketController } from "../controllers/ticket.controller.js";

export const ticketRouter = express.Router();

ticketRouter.get("/:tid", ticketController.getTicket);