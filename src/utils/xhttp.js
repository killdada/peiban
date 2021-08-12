import axios from 'axios'
import cookie from 'js-cookie'
import getBaseURL from 'src/const/baseURL'

const baseURL = getBaseURL()

const requestMap = {}

const xhttp = axios.create({
    headers: {
        Authorization: `Bearer ${cookie.get('el-time-range-picker__content')}`
    },
    baseURL
})

xhttp.interceptors.request.use(config => {
    if (config.method === 'get') {
        if (requestMap[config.url] && config.cancel) {
            requestMap[config.url].cancel()
        }
        requestMap[config.url] = axios.CancelToken.source()
        config.cancelToken = requestMap[config.url].token
    }
    const token = cookie.get('token') || ''
    if (token) {
        config.url = `${config.url}${
            config.url.indexOf('?') !== -1 ? '&' : '?'
        }token=${token}`
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }
    return config
})

xhttp.interceptors.response.use(
    response => {
        const config = response.config
        if (config.method === 'get' && requestMap[config.url]) {
            delete requestMap[config.url]
        }

        const res = response.data
        if (res.code === 1010) {
            // token 已失效，跳转到登录页
            cookie.remove('token')
            location.reload()
        }

        if (res.code === 200 || res.result) {
            return res.data
        }
        return Promise.reject({
            data: res.data,
            message: res.msg,
            code: res.code,
            toString() {
                return this.message
            }
        })
    },
    error => {
        if (!error.response) {
            return Promise.reject({
                message: '网络连接失败',
                code: -1,
                toString() {
                    return this.message
                }
            })
        } else if (
            error.response.status === 400 ||
            error.response.status === 401
        ) {
            cookie.remove('token')
            location.reload()
        }
        return Promise.reject(error)
    }
)

export default xhttp
