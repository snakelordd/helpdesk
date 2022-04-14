const { CurrentTicket, Ticket } = require("../models/models")
const ApiError = require('../error/ApiError')

class CurrentController {
    async getMyCurrent(req, res, next) {
        try {
            const {currentId} = req.params
            let {option, limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            
            const current = await CurrentTicket.findAll( {where: {currentId}, include: {model: Ticket}})
            return res.json(current)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getOneCurrent(req, res) {
        try {    
            const {ticketId, currentId} = req.params

            const current = await CurrentTicket.findOne( {
                    where: {ticketId, currentId},
                    include: {model: Ticket}
                })
            return res.json(current)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new CurrentController()