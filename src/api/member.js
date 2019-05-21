import xhttp from 'src/utils/xhttp'
import { extendUrl } from 'src/utils/httpQuery'
import getBaseURL from 'src/const/baseURL'

const baseUrl = getBaseURL()

// 获取人员列表
export function getMemberList(params) {
    return xhttp.get(extendUrl('/user'), { params })
}

export const reportLink = `${baseUrl}/user/export`

// 获取某个人员的学习记录列表
export function getMemberStudyList(name, params) {
    return xhttp.get(extendUrl(`/user/detail/${name}`), { params })
}
