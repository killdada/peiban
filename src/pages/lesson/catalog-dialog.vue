<template>
    <el-dialog
        :title="isEdit ? '编辑目录' : '新增目录'"
        class="catalog-dialog"
        width="1000px"
        :visible.sync="formVisible"
        @close="resetForm"
    >
        <el-form
            :model="form"
            v-loading="loading && isEdit"
            label-position="left"
            label-width="120px"
            :rules="rules"
            ref="form"
        >
            <el-form-item label="目录名称" prop="name">
                <el-input
                    v-model.trim="form.name"
                    placeholder="请输入目录名称"
                    maxlength="50"
                ></el-input>
            </el-form-item>
            <el-form-item label="目录别名" prop="alias">
                <el-input
                    v-model.trim="form.alias"
                    placeholder="请输入目录别名"
                    maxlength="3"
                ></el-input>
            </el-form-item>
            <el-form-item label="目录描述" prop="desc">
                <el-input
                    type="textarea"
                    placeholder="请输入目录描述"
                    :autosize="{ minRows: 3, maxRows: 6 }"
                    :maxlength="500"
                    v-model.trim="form.desc"
                ></el-input>
            </el-form-item>
            <el-form-item label="目录素材" prop="vedio">
                <el-radio-group
                    v-model="form.upload_type"
                    @change="changeMethod"
                >
                    <el-radio :label="1">直接上传</el-radio>
                    <el-radio :label="2">从素材库选择</el-radio>
                </el-radio-group>
                <template v-if="form.upload_type === 1">
                    <div class="single upload-vedio-container">
                        <div
                            :title="
                                uploadlingVideo
                                    ? '正在上传素材请稍候'
                                    : '点击这个区域可以上传素材'
                            "
                            class="video-preview"
                        >
                            <div
                                v-if="form.vedio || currentFileObj.name"
                                class="has-border"
                                @click="selectFile"
                                :class="uploadlingVideo && 'disabled'"
                            >
                                <span
                                    >您选择的文件：{{
                                        currentFileObj.name
                                    }}</span
                                >
                                <strong v-if="currentFileObj.percent > 0">
                                    已上传
                                    {{ currentFileObj.percent }}%
                                </strong>
                                <el-button
                                    size="small"
                                    :disabled="uploadlingVideo"
                                    type="primary"
                                    >点击上传</el-button
                                >
                            </div>
                            <el-button
                                size="small"
                                v-else
                                @click="selectFile"
                                type="primary"
                                >点击上传</el-button
                            >
                        </div>
                        <input
                            type="file"
                            id="upload"
                            style="display: none"
                            accept="video/*, audio/*"
                            @change="uploadfile"
                        />
                    </div>
                </template>
                <el-select
                    v-model="form.vediobind"
                    @change="changeSelectMaterial"
                    style="display: block;width: 300px;"
                    v-else
                    filterable
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in materialList"
                        :key="item.media_id"
                        :label="item.show_name"
                        :value="item.media_id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div slot="footer">
            <el-button @click="cancel" size="medium">取消</el-button>
            <el-button
                type="primary"
                :loading="btnloading"
                size="medium"
                @click="save"
                >确认</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
import { addCatalog, updateCatalog, getCatalogDetail } from 'src/api/lesson'
import { getMaterialsAll } from 'src/api/material'
import { qiniuUpload } from 'src/utils/qiniu'

export default {
    data() {
        const vaildVedio = (rule, value, callback) => {
            if (this.form.upload_type === 1) {
                if (!value) {
                    callback(new Error('目录视频、音频不能为空'))
                } else {
                    callback()
                }
            } else if (!this.form.vediobind) {
                callback(new Error('目录视频、音频不能为空,请绑定一个'))
            } else {
                callback()
            }
        }
        return {
            vedioData: { media_type: 3 },
            form: {
                name: '', // 目录名称
                alias: '', // 目录别名
                vedio: '', // 目录视频
                vediobind: '', // 绑定视频的值
                vedio_url: '',
                desc: '', // 目录描述
                upload_type: 1 // 1 .自上传，2.选择
            },
            formVisible: false,
            rules: {
                name: {
                    message: '目录名称不能为空',
                    required: true,
                    trigger: ['blur']
                },
                alias: {
                    message: '目录别名不能为空',
                    required: true,
                    trigger: ['blur']
                },
                vedio: {
                    validator: vaildVedio,
                    message: '',
                    required: true,
                    trigger: ['blur']
                },
                play_time: {
                    message: '目录素材时长不能为空',
                    required: true,
                    trigger: ['blur']
                }
            },
            loading: false,
            btnloading: false,
            isEdit: false,
            uploadlingVideo: false,
            currentFileObj: {},
            materialList: []
        }
    },
    methods: {
        changeSelectMaterial() {
            //
        },
        changeMethod() {
            this.$refs.form.clearValidate('vedio')
        },
        async getMaterials() {
            try {
                const res = await getMaterialsAll()
                this.materialList = res || []
            } catch (error) {
                //
            }
        },
        selectFile() {
            if (this.uploadlingVideo) {
                return
            }
            document.getElementById('upload').click()
        },
        addzero(t) {
            return t >= 10 ? t : `0${t}`
        },
        forMatTime(time) {
            const h = parseInt((time / 3600) % 60, 10)
            const m = parseInt((time / 60) % 60, 10)
            const s = parseInt(time % 60, 10)
            return `${this.addzero(h)}:${this.addzero(m)}:${this.addzero(s)}`
        },

        updateFileObj(params, row) {
            this.currentFileObj = {
                ...this.currentFileObj,
                ...params
            }
            if (params.status) {
                // 如果有，说明就是error 或者是完成，目前没有做暂停处理
                if (params.status === 'error') {
                    this.$message.error('上传失败！')
                } else if (params.status === 'completed') {
                    this.$message.success('素材上传成功')
                    this.form.vedio = row.name
                }
                this.uploadlingVideo = false
            }
        },
        async uploadfile() {
            const file = document.getElementById('upload').files[0]
            const fileObj = {
                file,
                name: file.name,
                size: file.size,
                percent: 0,
                status: null
            }
            this.currentFileObj = fileObj
            this.uploadlingVideo = true
            qiniuUpload(this.currentFileObj, this.updateFileObj)
        },
        async open(item) {
            this.formVisible = true
            this.isEdit = !!item
            this.hasChange = false

            try {
                await this.getMaterials()
            } catch (error) {
                //
            }
            if (this.isEdit) {
                this.loading = true
                getCatalogDetail(this.$route.params.id, item.id)
                    .then(res => {
                        const result = {
                            media_type: res.media_type,
                            id: res.id,
                            name: res.name, // 目录名称
                            alias: res.alias, // 目录别名
                            vedio: '', // 目录视频
                            vediobind: '', // 绑定视频的值
                            vedio_url: res.video_url,
                            desc: res.remark, // 目录描述
                            upload_type: res.upload_type // 1 .自上传，2.选择
                        }

                        if (res.upload_type === 1) {
                            this.currentFileObj = {
                                name: res.video_media_id,
                                key: res.video_media_id,
                                media_type: res.media_type
                            }
                            result.vedio = res.video_media_id
                        } else {
                            result.vediobind = res.video_media_id
                            this.currentFileObj = {}
                        }
                        // 始终保留上次的ppt内容
                        if (res.ppt && res.ppt.length) {
                            result.ppt = res.ppt
                        }
                        this.form = result
                    })
                    .finally(() => {
                        this.loading = false
                    })
            } else {
                this.resetForm()
                this.form = {
                    alias: '',
                    name: '', // 目录名称
                    vedio: '', // 目录视频
                    vedio_url: '',
                    vediobind: '', // 绑定视频的值
                    desc: '', // 目录描述
                    upload_type: 1,
                    play_time: ''
                }
                this.currentFileObj = {}
            }
            this.uploadlingVideo = false
        },
        close() {
            this.formVisible = false
        },
        resetForm() {
            this.$refs.form && this.$refs.form.resetFields()
        },
        cancel() {
            this.formVisible = false
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.btnloading) {
                        return
                    }
                    this.btnloading = true
                    const params = {
                        ...this.form
                    }
                    if (params.upload_type === 2) {
                        params.vedio = params.vediobind
                        const select = this.materialList.find(
                            item => item.media_id === params.vediobind
                        )
                        if (select) {
                            params.media_type = select.media_type
                        }
                    } else {
                        params.vedio = this.currentFileObj.key
                        params.media_type = this.currentFileObj.media_type
                    }
                    if (!this.isEdit) {
                        addCatalog(this.$route.params.id, params)
                            .then(() => {
                                this.$message.success('添加成功')
                                this.$emit('onsuccess')
                                this.formVisible = false
                            })
                            .catch(e => {
                                this.$message.error(e.message)
                            })
                            .finally(() => {
                                this.btnloading = false
                            })
                    } else {
                        updateCatalog(this.$route.params.id, params.id, params)
                            .then(() => {
                                this.$message.success('编辑成功')
                                this.formVisible = false
                                this.$emit('onsuccess')
                            })
                            .catch(e => {
                                this.$message.error(e.message)
                            })
                            .finally(() => {
                                this.btnloading = false
                            })
                    }
                }
            })
        }
    }
}
</script>

<style lang="less">
@import '~assets/less/var.less';

.catalog-dialog {
    .el-button {
        min-width: 100px;
    }
    .el-range-editor.el-input__inner {
        width: 400px;
    }
    .upload-vedio-container {
        video,
        img {
            width: 100%;
            height: 100%;
        }
        .video-preview {
            display: flex;
            position: relative;
            .has-border {
                border: 1px solid @border-color;
                padding: 0 5px;
                cursor: pointer;
                &.disabled {
                    cursor: not-allowed;
                }
            }
            span {
                margin-right: 5px;
            }
            .btn {
                height: 30px;
                background: #4c99fe;
                font-size: 14px;
                color: #fff;
                line-height: 30px;
                border-radius: 4px;
                margin-top: 5px;
                margin-left: 5px;
            }
        }
    }
}
</style>
