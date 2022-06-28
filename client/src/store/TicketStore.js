import {makeAutoObservable} from 'mobx'

export default class TicketStore {
    constructor() {
        this._tickets = []
        this._selectedTicket = null
        makeAutoObservable(this)
    }

    setTickets(ticket) {
        this._tickets = ticket
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