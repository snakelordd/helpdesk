import {makeAutoObservable} from 'mobx'

export default class TicketPropsStore {
    constructor() {
        this._categories = [
            {id: 1, name: 'M-apt'},
            {id: 2, name: 'Printers'},
            {id: 3, name: 'Other'}
        ]
        this._statuses = [
            {id: 1, name: 'ОТКРЫТ', tag: 'purple'},
            {id: 2, name: 'В РАБОТЕ', tag: 'processing'},
            {id: 3, name: 'ЗАКРЫТ', tag: 'success'}, 
            {id: 4, name: 'ОТЛОЖЕНО', tag: 'default'},
        ]

        this._priorities = [
            {id: 1, name: 'НИЗКИЙ'},
            {id: 2, name: 'СРЕДНИЙ'},
            {id: 3, name: 'ВЫСОКИЙ'}
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