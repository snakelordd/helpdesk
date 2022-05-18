import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = 
            {
                id: 1,
                email: 'user@mail.ru',
                password: '123',
                role: 'ADMIN',
                avatar: "staticAvatar.jpg",
                userInfo: {
                    id: 1, 
                    name: 'Аптека 1', 
                    address: 'Сибиряков-Гвардейцев, 34', 
                    organization: '',
                    department: 1,
                    userId: 1,
                    fedPhone: '+7-962-828-4729',
                    cityPhone: '249-59-01'
                }
            }
        
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

}