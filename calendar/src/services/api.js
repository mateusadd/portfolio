import axios from 'axios'

const api = axios.create({
    //baseURL: "https://portfolio-backend-production-3bf8.up.railway.app/"
    baseURL: "http://localhost:3001"
})

export default api