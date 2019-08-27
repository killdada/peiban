import xhttp from 'src/utils/xhttp'

export function login(params) {
    return xhttp.post('/login', params)
}

export function getUserInfo() {
    return xhttp.get('/login_info')
}

export function logOut() {
    return xhttp.post('/logout')
}
