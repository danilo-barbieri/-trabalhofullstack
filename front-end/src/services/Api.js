import axios from "axios";

export const urlApi = 'http://localhost:8000';

const api = axios.create({
    baseURL: `http://localhost:8000`,
})

export default api;