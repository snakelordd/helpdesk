const {Ticket, Category, Status, Priority, Chat, Message, Attachment, Current, CurrentTicket, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const closedId = process.env.CLOSED_ID

class TicketController {
    async create(req, res, next) {
        try {
            const {categoryId, title, description, userId, isPriority, status} = req.body
            let attachment
            let fileName

            if (req.files) {
                attachment = req.files.attachment
                fileName = uuid.v4() + '.jpg'
            }       

            let statusId = status || 1 // Начальный статус "Открыт" для созданной заявки
            
            const chat = await Chat.create()
            const current = await Current.findOne( {where: {userId}})

            const ticket = await Ticket.create(
                {
                    title, 
                    categoryId,  
                    statusId,
                    chatId: chat.id,
                    userId,
                }) 
            
            if (isPriority) {
                Ticket.update( { isPriority }, {where: { id: ticket.id }} )
            }
            await CurrentTicket.create( {
                ticketId: ticket.id,
                currentId: current.id,
                role: 'AUTHOR',

            })
            
            if (attachment) {
                attachment.mv(path.resolve(__dirname, '..', 'static', fileName))

                attachment = await Attachment.create(
                    {
                        attachment: fileName
                    }
                )
            }
            else attachment = {id: null}
            
            let message = await Message.create( {
                body: 'Заявка создана',
                chatId: chat.id,
                isLog: true
            })

            message = await Message.create(
                {
                    body: description,
                    isLog: false,
                    userId: userId,
                    chatId: chat.id,
                    attachmentId: attachment.id
                }
            ) 
          return res.json(ticket)
         }
         catch (e) {
             next(ApiError.internal(e.message))
         }     
    }

    async getAll(req, res) {
        let {option, limit, page, fromDate, toDate} = req.query
        let tickets
        page = page || 1
        limit = limit || 15
        let offset = page * limit - limit
        
        if (fromDate && toDate) {
            tickets = await Ticket.findAll(
                {
                    where: {
                        [Op.and]: [
                            sequelize.where(sequelize.fn('date', sequelize.col('ticket.createdAt')), '>=', fromDate),
                            sequelize.where(sequelize.fn('date', sequelize.col('ticket.createdAt')), '<=', toDate),
                        ]
                    },
                    attributes: ['id', 'title', 'createdAt', 'updatedAt', 'chatId', 'userId', 'isPriority',],
                    include: [ 
                        {model: Category, attributes: ['id','name']}, 
                        {model: Status, attributes: ['id', 'name', 'tag']},
                        {model: User, attributes: ['email']}
                    ],
                    limit, 
                    offset
            })
            
            return res.json(tickets)
        }
        if (option === 'all') {
            tickets = await Ticket.findAndCountAll(
                {
                    attributes: ['id', 'title', 'createdAt', 'updatedAt', 'chatId', 'userId', 'isPriority',],
                    include: [ 
                        {model: Category, attributes: ['id','name']}, 
                        {model: Status, attributes: ['id', 'name', 'tag']},
                        {model: User, attributes: ['email']}
                    ],
                    limit, 
                    offset
                })
            }
        
        if (option === 'open') {
            tickets = await Ticket.findAndCountAll(
                {
                    where: {
                        statusId: { [Op.ne]: closedId }, // проверка на закрытую заявку
                    }, 
                    attributes: ['id', 'title', 'createdAt', 'updatedAt', 'chatId', 'userId', 'isPriority',],
                    include: [ 
                        {model: Category, attributes: ['id','name']}, 
                        {model: Status, attributes: ['id', 'name', 'tag']},
                        {model: User, attributes: ['email']}
                    ],
                    limit, 
                    offset
                })
        } 
        if (option === 'closed') {
            tickets = await Ticket.findAndCountAll(
                {
                    where: {
                        statusId: closedId // проверка на закрытую заявку
                    }, 
                    attributes: ['id', 'title', 'createdAt', 'updatedAt', 'chatId', 'userId', 'isPriority'],
                    include: [ 
                        {model: Category, attributes: ['id','name']}, 
                        {model: Status, attributes: ['id', 'name', 'tag']},
                        {model: User, attributes: ['email']}
                    ],
                    limit, 
                    offset
                })
        }
        return res.json(tickets)
    }


    async getOne(req, res) {
        const {id} = req.params

        const ticket = await Ticket.findOne(
            {
                where: {id },
                attributes: ['id', 'title', 'createdAt', 'updatedAt', 'chatId', 'isPriority', 'userId'],
                include: [ {model: Category, attributes: ['id','name']}, {model: Status, attributes: ['id', 'name', 'tag']}]

            }
        )

        return res.json({ticket})
    }

    async updateTicket(req, res) {
        const {id} = req.params
        let {ticketId, statusId, isPriority, categoryId, userId, message} = req.body
        
        ticketId = id || ticketId
        let ticket = await Ticket.findOne( {
            where: {id: ticketId}
        })
        const {chatId} = ticket

        if (ticketId) {
            if (message) {
                await Message.create( {
                    body: message,
                    chatId,
                    isLog: false,
                    userId
                })
            }

            if (statusId)   { 
                await Message.create( {
                    body: 'Статус заявки изменен',
                    isLog: true,
                    chatId,
                })
                ticket = await Ticket.update( { statusId }, { where: {id: ticketId} } )
                
            }
            if (isPriority) { 
                await Message.create( {
                    body: 'Приоритет заявки изменен',
                    isLog: true,
                    chatId,
                })
                ticket = await Ticket.update( { isPriority }, { where: {id: ticketId} } )
                
            }
            if (categoryId) { 
                await Message.create( {
                    body: 'Категория заявки изменена',
                    chatId,
                    isLog: true
                })
                await Ticket.update( { categoryId }, { where: {id: ticketId} } )
                ticket = await Ticket.findOne( {
                    where: {id: ticketId}
                })
                
            }        
        }
        return res.json(ticket)
    }
}

module.exports = new TicketController()


