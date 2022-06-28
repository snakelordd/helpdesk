const {Ticket, Category, Status, Priority} = require('../models/models')
const ApiError = require('../error/ApiError')


class TicketSettingsController {
    async create(req, res, next) {
        try {
            const {category, status, tag} = req.body
        let setting
         if (category) {
             const candidate = await Category.findOne( {where: {name: category}})
             if (candidate) {
                 return next(ApiError.badRequest('Поле с таким именем уже существует'))
             }
          
             setting = await Category.create({name: category})
         }
         if (status) {
             const candidate = await Status.findOne( {where: {name: status}})
             if (candidate) {
                 return next(ApiError.badRequest('Поле с таким именем уже существует'))
             }
             setting = await Status.create({name: status, tag})
         } 
        return res.json(setting)
        }
        catch (e) {
            console.log(e.message)
        }
        
    }
    async getAll(req, res) {
        console.log(req)
        let {option} = req.query
        let setting 
        if (option === 'category' || !option) {
            setting = await Category.findAll()
        } 
        if (option === 'status') {
            setting = await Status.findAll()
        }

        return res.json(setting)
    }

    async updateSetting(req, res) {
        let {id, name, option} = req.body
        let setting
        switch (option) {
            case ('status'):
                setting = await Status.update( {name}, { where: {id}} )
                break
            case ('priority'):
                setting = await Priority.update( {name}, { where: {id}} )
                break  
            case ('category'):
                setting = await Category.update( {name}, { where: {id}} )
                break  
        }
        return res.json(setting)   
    }


}



module.exports = new TicketSettingsController()