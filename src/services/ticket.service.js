import { TicketDao } from '../DAO/classes/ticket.dao.js';
import { productService } from './products.service.js';
import UserService from './users.service.js';

const userService = new UserService();

const ticketDao = new TicketDao();

export class TicketService {
  async createOne(prodWithStock, userId) {
    const user = await userService.getUserById(userId);
    let total = 0;
    for (const item of prodWithStock) {
      const product = await productService.getProductById(item.product.id);
      total = total + product.price * item.quantity;
    }

    const code = Math.floor(Math.random() * 10000 + 1);

    const ticketCreated = await ticketDao.createOne({
        code,
        purchase_datetime: Date.now(),
        amount: total,
        purchaser: user.email
    });
    return ticketCreated;
    
  };

  async getTicketById(id) {
    const ticket = await ticketDao.getTicketById(id);
    return ticket;
  }
}

