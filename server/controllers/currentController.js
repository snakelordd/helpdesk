const { CurrentTicket, Ticket, Category, Status, User } = require("../models/models")
const ApiError = require('../error/ApiError')
const closedId = process.env.CLOSED_ID
const { Op } = require('sequelize')

class CurrentController {
    async getMyCurrent(req, res, next) {
        try {
            let {option, limit, page, userId} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            
            console.log(userId)
            const current = await CurrentTicket.findAll( 
                {
                    where: {currentId: userId}, 
                    attributes: ['role'],
                    include: [ 
                        {
                            model: Ticket, 
                            attributes: ['id', 'title', 'createdAt', 'chatId', 'userId', 'isPriority',],
                            include: [
                                {model: Category, attributes: ['id','name']}, 
                                {model: Status, attributes: ['id', 'name', 'tag']},
                                {model: User, attributes: ['email']}
                            ],
                            where: {
                                statusId: { [Op.ne]: closedId }
                            }
                        },

                    ],
                })

            return res.json(current)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async setCurrent(req, res, next) {
        try {
            let { userId, ticketId} = req.body

            let ticket = await Ticket.findOne({where: {id: ticketId}})

            const current = await CurrentTicket.create({
                ticketId: ticketId,
                currentId: userId,
                role: 'HOLDER',
            })

            await Message.create( {
                body: 'Статус заявки изменен',
                isLog: true,
                chatId: ticket.chatId,
            })

            ticket = await Ticket.update( { statusId: 3 }, { where: {id: ticketId} } )

            return res.json(current)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new CurrentController()