const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    avatar: {type: DataTypes.STRING, defaultValue: 'staticAvatar.jpg'}
})

const UserInfo = sequelize.define('user_info', {
    name: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    organization: {type: DataTypes.STRING},
    department: {type: DataTypes.STRING},
})

const Current = sequelize.define('current', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

 const CurrentTicket = sequelize.define('current_ticket', {
     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
     role: {type: DataTypes.STRING, allowNull: false}
 })

const Ticket = sequelize.define('ticket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    userId: {type: DataTypes.INTEGER},
    isPriority: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Chat = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Status = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    body: {type: DataTypes.STRING, allowNull: false},
    isLog: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Attachment = sequelize.define('attachment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    attachment: {type: DataTypes.STRING, allowNull: false}, 
})

// const TicketUser = sequelize.define('ticket_user', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })


User.hasOne(UserInfo)
UserInfo.belongsTo(User)

User.hasOne(Current)
 Current.belongsTo(User)

Current.hasMany(CurrentTicket)
 CurrentTicket.belongsTo(Current)

User.hasMany(Message)
Message.belongsTo(User)

//User.hasMany(Ticket, {as: 'author'})
//Ticket.belongsTo(User)

Current.belongsToMany(Ticket, {through: CurrentTicket})
Ticket.belongsToMany(Current, {through: CurrentTicket})

Chat.hasOne(Ticket)
Ticket.belongsTo(Chat)

Ticket.hasMany(CurrentTicket)
CurrentTicket.belongsTo(Ticket)

Chat.hasMany(Message)
Message.belongsTo(Chat)

Attachment.hasMany(Message)
Message.belongsTo(Attachment)

Category.hasMany(Ticket)
Ticket.belongsTo(Category)

Status.hasMany(Ticket)
Ticket.belongsTo(Status)

module.exports = {
    User,
    UserInfo,
    Current,
    CurrentTicket,
    Ticket,
    Chat,
    Category,
    Status,
    Message,
    Attachment
}