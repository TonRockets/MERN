const axios = require('axios')

const api = axios.create({
    baseURL: 'http://localhost:3003/api'
})

export default api