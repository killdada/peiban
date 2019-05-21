import axios from 'axios'
import cookie from 'js-cookie'

const requestMap = {}
const http = axios.create()

http.interceptors.request.use(config => {
    if (config.method === 'get') {
        if (requestMap[config.url] && config.cancel) {
            requestMap[config.url].cancel()
        }
        requestMap[config.url] = axios.CancelToken.source()
        config.cancelToken = requestMap[config.url].token
    }
    return config
})

http.interceptors.response.use(
    response => {
        const config = response.config
        if (config.method === 'get' && requestMap[config.url]) {
            delete requestMap[config.url]
        }
        return response.data
    },
    error => {
        if (error.response.status === 400 || error.response.status === 401) {
            cookie.remove('token')
            location.reload()
        }
        return Promise.reject(error)
    }
)

export default http
