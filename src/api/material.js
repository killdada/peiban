import xhttp from 'src/utils/xhttp'
import { extendUrl } from 'src/utils/httpQuery'

// 保存素材到接口
export function saveMaterial(params) {
    return xhttp.post(extendUrl('/material'), params)
}

// 获取素材列表接口
export function getMaterials(params) {
    return xhttp.get(extendUrl('/material'), { params })
}

// 更新素材标题
export function updateMaterial(id, params) {
    return xhttp.put(extendUrl(`/material/${id}`), params)
}
