import { logger } from "../../config/logger.js";
import TicketModel from "./models/ticket.model.js";

class TicketDaoMongo {
  constructor() {
    this.TicketModel = TicketModel;
  }

   createTicket = async(data) => {
    try {
      const ticket = await this.TicketModel.create(data);
      return ticket;
    } catch (error) {
      logger.warning(error)
      throw new Error("Error creating ticket: " + error.message);
    }
  }
}

export default TicketDaoMongo;
