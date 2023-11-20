import axios from 'axios'

const api = axios.create({
    baseURL: "https://backend-production-7cd7.up.railway.app/"
    //baseURL: "http://localhost:3001"
})

export default api