
import axios from 'axios'

const api = axios.create({
    baseURL: '/api'
})

api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
api.defaults.headers.common['Accept'] = 'application/json';
api.defaults.headers.common['Content-type'] = 'application/json';

export default api
