const { Ticket, Message, Attachment, User, UserInfo } = require("../models/models")
const ApiError = require('../error/ApiError') 
const uuid = require('uuid')
const path = require('path')

class chatController {
    async newMsg(req, res, next) {
        try {
            const {body, userId, chatId} = req.body
            let attachment
            let fileName

            if (req.files) {
                attachment = req.files.attachment
                fileName = uuid.v4() + '.jpg'
            }       

            if (attachment) {
                attachment.mv(path.resolve(__dirname, '..', 'static', fileName))

                attachment = await Attachment.create(
                    {
                        attachment: fileName
                    }
                )
            }
            else attachment = {id: null}
            let msg = null;
            body ? msg = body : msg

            const ticket = await Ticket.findOne({where: {chatId}})
            const user = await User.findOne({where: {id: userId}})

            if (ticket.statusId === 1) {
                await Ticket.update({statusId: 3}, {where: {id: ticket.id} })
            }
            if (ticket.statusId === 2) {
                await Ticket.update({statusId: 1}, {where: {id: ticket.id} })
            }
            
            let message = await Message.create(
                {
                    body: msg,
                    isLog: false,
                    userId,
                    chatId,
                    attachmentId: attachment.id
                }
            ) 
            return res.json(message)
         }
         catch (e) {
             next(ApiError.internal(e.message))
         }     
    }
    async getMsg(req, res) {
        const {id} = req.params

        const {chatId} = await Ticket.findOne( {where: {id}})

        const messages = await Message.findAll( 
            {
                where: {chatId: chatId},
                include: [ { model: Attachment }, { model: User, attributes: ['email']}],
                order: [
                    ['createdAt', 'DESC']
                ],
            })
        
        return res.json(messages)
    }
}

module.exports = new chatController()