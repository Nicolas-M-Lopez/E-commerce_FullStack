import { logger } from "../config/logger.js";
import { ticketService } from "../services/index.js";

const ticketDao = ticketService

class TicketController{
    createTicket = async(req,res,next) => {
        try {
            let ticket = await ticketDao.createTicket()
            return res.status(200).json({
                success: true,
                reponse: ticket
            })
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}

export default new TicketController()