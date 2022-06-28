import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export const createProp = async (status, category) => {
    let data 
    if (status) {
        data = await $authHost.post('api/ticketsettings/add', {status})
    }
    if (category) {
        data = await $authHost.post('api/ticketsettings/add', {category})
    }
    return data
}

export const fetchProps = async (prop) => {
    let data
    if (prop === 'status') {
        data  = await $authHost.get('api/ticketsettings/?option=status')
    }
    if (prop === 'category') {
        data  = await $authHost.get('api/ticketsettings/?option=category')
    }
    return data
}
