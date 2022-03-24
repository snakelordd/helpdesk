const {Ticket, Category, Status, Priority, Chat, Message, Attachment, Current} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')

class TicketController {
    async create(req, res, next) {
        try {
            const {categoryId, title, description, userId, priority, status} = req.body
            let attachment
            let fileName

            if (req.files) {
                attachment = req.files.attachment
                fileName = uuid.v4() + '.jpg'
            }       

            let statusId = status || 1 // Начальный статус "Открыт" для созданной заявки
            let priorityId = priority || 1
            
            const chat = await Chat.create()

            const ticket = await Ticket.create(
                {
                    title, 
                    userId, 
                    categoryId,  
                    priorityId,  
                    statusId,
                    chatId: chat.id
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
        let {option, limit, page} = req.query
        let tickets
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        

        if (option === 'open') {
            tickets = await Ticket.findAndCountAll(
                {
                    where: {
                        statusId: { [Op.ne]: 2 } // проверка на закрытую заявку
                    }, 
                    limit, 
                    offset
                })
        } 
        if (option === 'closed') {
            tickets = await Ticket.findAndCountAll(
                {
                    where: { statusId: 2 } ,
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
                where: {id},
                include: [ {model: Category}, {model: Status}, {model: Priority}]

            }
        )
        return res.json({ticket})
    }

    async updateTicket(req, res) {
        const {id} = req.params
        let {ticketId, statusId, priorityId, categoryId, userId} = req.body
        
        ticketId = id || ticketId
        const ticket = await Ticket.findOne( {
            where: {id: ticketId}
        })
        const {chatId} = ticket

        if (ticketId) {
               
            if (statusId)   { 
                await Ticket.update( { statusId }, { where: {id: ticketId} } )
                await Message.create( {
                    body: 'Статус заявки изменен',
                    isLog: true,
                    chatId,
                })
            }
            if (priorityId) { 
                await Ticket.update( { priorityId }, { where: {id: ticketId} } )
                await Message.create( {
                    body: 'Приоритет заявки изменен',
                    isLog: true,
                    chatId,
                })
            }
            if (categoryId) { 
                await Ticket.update( { categoryId }, { where: {id: ticketId} } )
                await Message.create( {
                    body: 'Категория заявки изменена',
                    chatId,
                    isLog: true
                })
            }

            if (userId) {
                await Current.create( { userId, ticketId })
                await Message.create( {
                    body: 'Назначен исполнитель',
                    chatId,
                    isLog: true
                })
            }
        }
        return res.json(ticket)
    }
}

module.exports = new TicketController()


