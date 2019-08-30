import xhttp from 'src/utils/xhttp'

export function uploadFile(params) {
    return xhttp.post('/college/upload', params)
}

// 获取所有的课程
export function getAllLesson() {
    return xhttp.get('/lesson/all')
}

// 获取上传的token
export function getQiniuToken() {
    return xhttp.get('/qiniu_token')
}
