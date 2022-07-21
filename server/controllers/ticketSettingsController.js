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
        try {
            let {id, name, option, isDelete, tag,  } = req.body
            let setting

            switch (option) {

                case ('status'):
                    if (isDelete === true) {
                        await Ticket.update( { statusId: 1 }, { where: {statusId: id} } )
                        setting = await Status.findOne({ where: { id },})
                        if (setting) 
                            await setting.destroy()

                        return res.json(setting)
                    }
                    setting = await Status.update( {name}, { where: {id}} )

                    if (tag) 
                        setting = await Status.update( {tag}, { where: {id}} )

                    break
                case ('category'):
                    if (isDelete === true) {
                        try {
                            await Category.create({id: 0, name: 'Без категории'})
                        }
                        catch {
                            
                        }
                        await Ticket.update( { categoryId: 0 }, { where: {categoryId: id} } )
                        setting = await Category.findOne({ where: { id },})
                        if (setting) 
                            await setting.destroy()
                        
                        return res.json(setting)
                    }
                    setting = await Category.update( {name}, { where: {id}} )
                    break   
            }
            return res.json(setting)   
        }
        catch (e) {
            console.log(e.message)
        }
    }


}



module.exports = new TicketSettingsController()