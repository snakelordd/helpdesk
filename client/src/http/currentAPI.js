import {$authHost, $host} from './index'

export const addToCurrent = async (ticket) => {
    const {data} = await $authHost.post('api/tickets/create', ticket)
    return data
}

export const fetchCurrent = async () => {
    const {url} = 'api/tickets/all/?option=open'
    const {data}  = await $authHost.get('api/tickets/all/?option=open')
    return data
}
