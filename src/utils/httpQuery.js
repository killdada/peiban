import qs from 'querystring'
import cookie from 'js-cookie'

export function extendUrl(url) {
    const query = qs.stringify({
        token: cookie.get('token') || ''
    })
    return `${url}?${query}`
}
