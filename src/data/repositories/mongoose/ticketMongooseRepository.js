import ticketSchema from '../../models/ticketSchema.js';
import Ticket from '../../../domain/entities/ticket.js';

class TicketMongooseRepository {
  async getOne(id) {
    const ticketDocument = await ticketSchema.findOne({ _id: id });
    if (!ticketDocument._id) {
      throw new Error('Ticket not found.');
    }
    return new Ticket({
      id: ticketDocument?._id,
      code: ticketDocument?.code,
      purchaseDateTime: ticketDocument?.purchaseDateTime,
      amount: ticketDocument?.amount,
      purchaser: ticketDocument?.purchaser
    });
  }
  async getByEmail(email) {
    const ticketDocument = await ticketSchema.find({ email });
    if (!ticketDocument) {
      throw new Error('Tickets not found.');
    }
    const tickets = ticketDocument.map(
      (document) =>
        new Ticket({
          id: ticketDocument?._id,
          code: ticketDocument?.code,
          purchaseDateTime: ticketDocument?.purchaseDateTime,
          amount: ticketDocument?.amount,
          purchaser: ticketDocument?.purchaser
        })
    );
    return tickets;
  }

  async create(data) {
    const ticketDocument = await ticketSchema.create(data);
    return new Ticket({
      id: ticketDocument?._id,
      code: ticketDocument?.code,
      purchaseDateTime: ticketDocument?.purchaseDateTime,
      amount: ticketDocument?.amount,
      purchaser: ticketDocument?.purchaser
    });
  }
}

export default TicketMongooseRepository;
