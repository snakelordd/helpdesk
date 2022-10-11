import {$authHost, $host} from './index'

export const setCurrent = async (formData) => {
    const {data} = await $authHost.post('api/current/', formData)
    return data
}

export const fetchCurrent = async (userId) => {
    const {data}  = await $authHost.get('api/current/', { params: { userId: userId }})
    return data
}
