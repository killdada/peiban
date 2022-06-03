export default function getBaseURL() {
    const isProduct = process.env.NODE_ENV === 'production'
    let baseUrl = 'http://127.0.0.1:7001/api/v1/backend' // 默认测试环境端口号的，H5地址是 http://120.24.48.163:7051 接口地址是7050

    if (!isProduct) {
        // 本地始终指向端口号
        return baseUrl
    }
    const host = window.location.host
    // 如果H5不带端口号，那么直接指向当前主域名
    if (host.indexOf('7051') === -1) {
        baseUrl = '/api/v1/backend'
    }

    if (process.env.VUE_APP_VERCEL === '1') {
        return 'https://peiban-backend.yenmysoft.com.cn/api/v1/backend'
    }
    return baseUrl
}
