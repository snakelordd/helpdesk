const jwt = require('jsonwebtoken')


module.exports = function(role, role2) {
    return function(req, res, next) {
        if (req.method == 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: 'Не авторизован'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decoded
            
            if (decoded.role !== role && decoded.role !== role2) {
                
                return res.status(403).json(
                    {
                        message: 'У вас недостаточно прав'
                    })
            }
            next()
        }
        catch(e) {
            return res.status(403).json({message: 'Нет доступа'})
        }
    }
}


