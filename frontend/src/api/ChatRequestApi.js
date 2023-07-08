import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8080' })

export const userChats = (id) => {
    return API.get(`/chat/${id}`)
}