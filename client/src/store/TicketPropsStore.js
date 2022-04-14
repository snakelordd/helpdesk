import {makeAutoObservable} from 'mobx'

export default class TicketPropsStore {
    constructor() {
        this._categories = [
            {id: 1, name: 'M-apt'},
            {id: 2, name: 'Printers'},
            {id: 3, name: 'Other'}
        ]
        this._statuses = [
            {id: 1, name: 'OPEN'},
            {id: 2, name: 'PROCESSING'},
            {id: 3, name: 'CLOSED'},
            {id: 4, name: 'PENDING'},
        ]

        this._priorities = [
            {id: 1, name: 'LOW'},
            {id: 2, name: 'NORMAL'},
            {id: 3, name: 'HIGH'}
        ]
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    setStatuses(statuses) {
        this._statuses = statuses
    }
    setPriorities(priorities) {
        this._priorities = priorities
    }

    get categories() {
        return this._categories
    }

    get statuses() {
        return this._statuses
    }
    get priorities() {
        return this._priorities
    }

}