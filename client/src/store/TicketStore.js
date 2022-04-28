import {makeAutoObservable} from 'mobx'

export default class TicketStore {
    constructor() {
        this._tickets = [
            {
                id: 1, 
                title: 'ОБНОВИТЕ ПРОГРАММЫ ВОРД И ЭХЕЛЬ ', 
                createdAt: '2022-03-31 09:41:01+07', 
                category: {
                    id: '1',
                    name: "ДРУГОЕ",
                    },
                status:  {
                    id: '1',
                    name: "ОТКРЫТ",
                },
                isPriority: true,
            },
            {
                id: 2, 
                title: 'ticket title 2', 
                createdAt: '2022-03-31 12:24:44+07', 
                category: {
                    id: '2',
                    name: "Принтеры",
                    },
                status:  {
                    id: '2',
                    name: "В РАБОТЕ",
                },
                isPriority: false,
            },
            {
                id: 3, 
                title: 'ticket title', 
                createdAt: '2022-03-31 14:04:01+07',
                category: {
                    id: '3',
                    name: "М-Аптека",
                    },
                status:  {
                    id: '1',
                    name: "ОТКРЫТ",
                },
                isPriority: false,
            },
        ]
        this._selectedTicket = null
        makeAutoObservable(this)
    }

    setTickets(ticket) {
        this._categories = ticket
    }

    setSelectedTicket(ticket) {
        this._selectedTicket = ticket
    }
    get tickets() {
        return this._tickets
    }

    get selectedTicket() {
        return this._selectedTicket
    }




}