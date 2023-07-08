import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8080' })

export const getMessages = (id) => {
    return API.get(`/message/${id}`)
}

export const addMessages = (data) => {
    return API.post(`/message/`, data)
}