
import { TicketService } from '../services/ticket.service.js'

const ticketService = new TicketService();

 class TicketController {

    async getTicket(req, res){
        const ticketId = req.params.tid;
        const ticket = await ticketService.getTicketById(ticketId);
        return res.render('ticket', {code: ticket.code, purchase_datetime: ticket.purchase_datetime, amount: ticket.amount, purchaser: ticket.purchaser});
    }
    
};

export const ticketController = new TicketController();