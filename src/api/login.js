import xhttp from 'src/utils/xhttp'
import { extendUrl } from 'src/utils/httpQuery'

export function login(params) {
    return xhttp.post('/login', params)
}

export function getUserInfo() {
    return xhttp.get(extendUrl('/login_info'))
}

export function logOut() {
    return xhttp.get(extendUrl('/logout'))
}
