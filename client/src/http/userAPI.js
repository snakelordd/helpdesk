import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export const registration = async ( email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const createUser = async (formData) => {
    const {data} = await $host.post('api/user/registration', formData)
    return jwt_decode(data.token)
}

export const deleteUser = async (userId) => {
    const {data} = await $host.get('api/user/deleteUser', { params: { userId: userId }})
    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')

        if (!localStorage.token) {
           localStorage.setItem('token', data.token) 
        }
    return data
}

export const updateUser = async (formData) => {
    const {data} = await $authHost.post('api/user/edit', formData)
    return data
}

export const addUserInfo = async (formData) => {
    const {data} = await $authHost.post('api/user/profile', formData)
    return data
}

export const fetchAllUsers = async () => {
    const {data} = await $authHost.get('api/user/')
    return data
}

export const fetchOneUser = async (id) => {
    const {data} = await $authHost.get('api/user/' + id)
    return data
}