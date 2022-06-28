import {makeAutoObservable} from 'mobx'

export default class TicketPropsStore {
    constructor() {
        this._categories = []
        this._statuses = []
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    setStatuses(statuses) {
        this._statuses = statuses
    }


    get categories() {
        return this._categories
    }

    get statuses() {
        return this._statuses
    }

}