import xhttp from 'src/utils/xhttp'

// 保存素材到接口
export function saveMaterial(params) {
    return xhttp.post('/material', params)
}

// 获取素材列表接口
export function getMaterials(params) {
    return xhttp.get('/material', { params })
}

// 更新素材标题
export function updateMaterial(id, params) {
    return xhttp.put(`/material/${id}`, params)
}
