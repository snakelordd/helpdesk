import {makeAutoObservable} from 'mobx'

export default class TicketStore {
    constructor() {
        this._tickets = [
            {
                id: 1, 
                title: 'ОБНОВИТЕ ПРОГРАММЫ ВОРД И ЭХЕЛЬ ', 
                createdAt: '2022-03-31 09:41:01+07', 
                category: "OTHER",
                status:  "OPEN", 
                priority: "LOW"
            },
            {
                id: 2, 
                title: 'ticket title 2', 
                createdAt: '2022-03-31 12:24:44+07', 
                category: "OTHER",
                status:  "OPEN", 
                priority: "LOW"
            },
            {
                id: 3, 
                title: 'ticket title', 
                createdAt: '2022-03-31 14:04:01+07',
                category: "OTHER",
                status:  "OPEN", 
                priority: "LOW"
            }
        ]
        makeAutoObservable(this)
    }

    setTickets(ticket) {
        this._categories = ticket
    }
    get tickets() {
        return this._tickets
    }



}