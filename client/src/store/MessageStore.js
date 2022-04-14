import {makeAutoObservable} from 'mobx'

export default class MessageStore {
    constructor() {
        this._messages = [
            {id: 1, body: 'Заявка создана', isLog: true, userId: null, chatId: 1},
            {id: 1, body: 'Недопустимый переход в товаропроводящей цепочке', isLog: false, userId: 1, chatId: 1},
            {id: 1, body: 'Статус заявки изменен', isLog: true, userId: null, chatId: 1},
            ]
        makeAutoObservable(this)
    }

    setTickets(messages) {
        this._categories = messages
    }
    get messages() {
        return this._messages
    }



}