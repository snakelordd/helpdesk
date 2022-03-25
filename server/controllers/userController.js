const ApiError = require("../error/ApiError")
const { UserInfo, User, Current } = require("../models/models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}    
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.internal('Введите email или пароль'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.internal('Пользователь уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create( {email, role, password: hashPassword})

        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne( {where: {email}} )
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неправильный email или пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
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
