import { TicketModel } from '../models/ticket.model.js';

export class TicketDao {
  async createOne(ticket) {
    const ticketCreated = await TicketModel.create(ticket);
    return ticketCreated;
  }

  async getTicketById(id) {
    const getTicketById = await TicketModel.findOne({ _id: id });
    return getTicketById;
  }
}
