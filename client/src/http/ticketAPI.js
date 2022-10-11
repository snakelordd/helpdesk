import {$authHost, $host} from './index'

export const createTicket = async (ticket) => {
    const {data} = await $authHost.post('api/tickets/create', ticket)
    return data
}

export const fetchTickets = async (all = false, fromDate, toDate) => {
    if (fromDate && toDate) {
        const {data}  = await $authHost.get('api/tickets/all/?option=all',  { params: { fromDate: fromDate, toDate: toDate }})
        return data
    }
    if (all === true) {
        const {data}  = await $authHost.get('api/tickets/all/?option=all')
        return data
    }
    const {data}  = await $authHost.get('api/tickets/all/?option=open')
    return data
}

export const fetchClosedTickets = async () => {
    const {data}  = await $authHost.get('api/tickets/all/?option=closed')
    return data
}

export const fetchOneTicket = async (id) => {
    const {data} = await $authHost.get('api/tickets/' + id)
    return data
}

export const updateTicket = async (id, ticket) => {
    const {data} = await $authHost.post('api/tickets/' + id, ticket)
    return data
}