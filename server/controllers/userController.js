const ApiError = require("../error/ApiError")
const { UserInfo, User } = require("../models/models")

class UserController {
    async registration(req, res) {
        const {email, role, password, ip} = req.body
        
        const user = await User.create( {email, role, password})

        return res.json({user})
    }
    async login(req, res) {
        
    }
    async check(req, res, next) {
        const {id} = req.query
        if (!id) {
           return  next(ApiError.badRequest('no id'))
        }
        res.json(id)
    }
    async getAllUsers(req, res) {
        let {userRole} = req.query
        let users

        if (!userRole) {
            users = await User.findAndCountAll()
        } 
        if (userRole) {
            users = await User.findAndCountAll({where: {userRole}})
        }
        return res.json(users)
    }
    async getOneUser(req, res) {
        const{id} = req.params
        
        const user = await User.findOne(
                {
                    where: {id},
                    include: [ { model: UserInfo} ]
                }, 
            
            ) 
        return res.json(user)
    }
}

module.exports = new UserController()