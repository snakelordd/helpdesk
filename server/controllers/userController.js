const ApiError = require("../error/ApiError")
const { UserInfo, User, Current, Token } = require("../models/models")
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
        const cuurent = await Current.create( {userId: user.id})
        
        const token = generateJwt(user.id, user.email, user.role)

        await Token.create( {
            userId: user.id,
            refToken: token
        })

        return res.json({token})
    }

    async setInfo(req, res, next) {
        try {
            const {name, address, organization, department, userId, fedPhone, cityPhone} = req.body
            const userInfo = await UserInfo.create(
                {
                    name, 
                    address,  
                    organization,  
                    department,
                    userId: userId,
                    fedPhone,
                    cityPhone
                }) 

          return res.json(userInfo)
         }
         catch (e) {
             next(ApiError.internal(e.message))
         }     
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

         await Token.update( {
             refToken: token
             },
             {where: {userId: user.id},
            
         })

        return res.json({token})
    }
    async check(req, res, next) {
        try {
            const user = await User.findOne( {where: {id: req.user.id}, attributes: ['id', 'email', 'role', 'avatar'] })
            const token = await Token.findOne( 
            {
                where: {userId: req.user.id}
            } )
            if (token?.refToken === req?.token) {
            return res.json({token: token.refToken, user: user})
            }
            else {
                return generateJwt(req.user.id, req.user.email, req.user.role)
            }
        } 
        catch (e) {
            next(ApiError.internal(e.message))
        }
 
        //  const token = generateJwt(req.user.id, req.user.email, req.user.role)
        //  return res.json({token})
    }
    
    async getAllUsers(req, res) {
        let {role} = req.query
        role = role.toUpperCase()
        let users
        console.log(role)
        if (!role) {
            users = await User.findAll(

            )
        } 
        if (role) {
            users = await User.findAll(
                {
                    where: {role},
                    attributes: ['id', 'email', 'role', 'avatar'],
                    include: [ { model: UserInfo, attributes: ['name', 'address', 'organization', 'department', 'cityPhone', 'fedPhone']} ] 
                }
            )
        }
        return res.json(users)
    }
    async getOneUser(req, res) {
        const{id} = req.params
        
        const user = await User.findOne(
                {
                    where: {id},
                    attributes: ['id', 'email', 'role', 'avatar'],
                    include: [ { model: UserInfo, attributes: ['name', 'address', 'organization', 'department', 'cityPhone', 'fedPhone']} ]
                }, 
            
            ) 
        return res.json(user)
    }
}

module.exports = new UserController()
