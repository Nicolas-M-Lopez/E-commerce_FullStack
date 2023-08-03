class TicketRepository{
    constructor(dao){
        this.dao = dao
    }
    createTicket = async (data) =>{
        let result = await this.dao.create(data)
        return result
    } 
}
export default TicketRepository