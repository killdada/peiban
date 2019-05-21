import xhttp from 'src/utils/xhttp'
import { extendUrl } from 'src/utils/httpQuery'
import getBaseURL from 'src/const/baseURL'

const baseURL = getBaseURL()

export const uploadImg = extendUrl(`${baseURL}/college/upload`)

export function uploadFile(params) {
    return xhttp.post(extendUrl('/college/upload'), params)
}

// 获取所有的课程
export function getAllLesson() {
    return xhttp.get(extendUrl('/lesson/all'))
}
