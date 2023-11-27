import axios from 'axios'

var url

if(process.env.NODE_ENV === 'development') {
    url = "http://localhost:3001"
} else {
    url="https://portfolio-backend-production-3bf8.up.railway.app"
}

const api = axios.create({
    baseURL: url
})

export default api