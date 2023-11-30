import axios from 'axios'

let url

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    url = "http://localhost:3001"
} else {
    url="https://portfolio-backend-production-3bf8.up.railway.app"
}

const api = axios.create({
    baseURL: url
})

export default api