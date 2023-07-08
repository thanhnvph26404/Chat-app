import axios from "axios"
const API = axios.create({ baseURL: 'http://localhost:8080' })

export const uploadImage = (data) => {
    return API.post('/upload', data)
}

export const uploadPost = (data) => {
    return API.post('/post', data)
}