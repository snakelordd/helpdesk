import {$authHost, $host} from './index'

export const createMessage = async (message) => {
    const {data}  = await $authHost.post('api/chat/', message)
    return data
}
export const fetchMessages = async (id) => {
    const {data}  = await $authHost.get('/api/chat/' + id, )
    return data
}