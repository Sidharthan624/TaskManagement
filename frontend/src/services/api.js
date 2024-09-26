import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData)
    return response
}
export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData)
    return response
}
export const getTasks = async (token) => {
    const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response
}
export const addTask = async (taskData, token) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response
}
export const updateTask = async (taskId, taskData, token) => {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response
}
export const completeTask = async (id, token, data) => {
    return await axios.put(`${API_URL}/tasks/${id}/toggle-completion`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};
export const deleteTask = async (taskId, token) => {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return response
}