import axios from "axios"
const API = axios.create({ baseURL: 'http://localhost:8080' })


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});
  
export const getUser = (userId) => {
    return API.get(`/user/${userId}`)
}

export const updateUser = (id, formData) => {
    return API.put(`/user/${id}`, formData)
}

export const getAllUser = () => {
    return API.get(`/user`)
}

export const followUser = (id, data) => {
    return API.put(`/user/${id}/follow`, data)
}

export const unfollowUser = (id, data) => {
    return API.put(`/user/${id}/unfollow`, data)
}