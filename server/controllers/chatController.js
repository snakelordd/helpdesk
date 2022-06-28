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