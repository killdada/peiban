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
            <el-form-item label="目录视频" prop="vedio">
                <div class="single  upload-vedio-container">
                    <div
                        :title="
                            uploadlingVideo
                                ? '正在上传视频请稍候'
                                : '点击这个区域可以上传视频'
                        "
                        class="video-preview"
                    >
                        <div
                            v-if="form.vedio || currentFileObj.name"
                            class="has-border"
                            @click="selectFile"
                            :class="uploadlingVideo && 'disabled'"
                        >
                            <span>您选择的文件：{{ currentFileObj.name }}</span>
                            <strong v-if="currentFileObj.percent > 0"
                                >已上传 {{ currentFileObj.percent }}%</strong
                            >
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
                        accept="video/*"
                        @change="uploadfile"
                    />
                </div>
            </el-form-item>
            <el-form-item label="目录视频时长" prop="play_time">
                <el-time-picker
                    v-model="form.play_time"
                    value-format="HH:mm:ss"
                    placeholder="选择时间范围"
                >
                </el-time-picker>
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
import { qiniuUpload } from 'src/utils/qiniu'

export default {
    data() {
        return {
            vedioData: { media_type: 3 },
            form: {
                name: '', // 目录名称
                alias: '', // 目录别名
                vedio: '', // 目录视频
                vedio_url: '',
                desc: '' // 目录描述
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
                    message: '目录视频不能为空',
                    required: true,
                    trigger: ['blur']
                },
                play_time: {
                    message: '目录视频时长不能为空',
                    required: true,
                    trigger: ['blur']
                }
            },
            loading: false,
            btnloading: false,
            isEdit: false,
            uploadlingVideo: false,
            currentFileObj: {}
        }
    },
    methods: {
        selectFile() {
            if (this.uploadlingVideo) {
                return
            }
            document.getElementById('upload').click()
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
                    this.$message.success('视频上传成功')
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
        open(item) {
            this.formVisible = true
            this.isEdit = !!item
            this.hasChange = false

            if (this.isEdit) {
                this.loading = true
                getCatalogDetail(this.$route.params.id, item.id)
                    .then(res => {
                        this.form = {
                            ...res,
                            desc: res.remark,
                            vedio: res.video_media_id, // 目录视频
                            vedio_url: res.video_url
                        }
                        this.currentFileObj = {
                            ...this.currentFileObj,
                            name: res.video_media_id
                        }
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
                    desc: '' // 目录描述
                }
            }
            this.uploadlingVideo = false
        },
        close() {
            this.formVisible = false
        },
        resetForm() {
            this.uploaderInstance && this.uploaderInstance.destroy()
            this.uploaderInstance = ''
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
                    if (!this.isEdit) {
                        addCatalog(this.$route.params.id, this.form)
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
                        updateCatalog(
                            this.$route.params.id,
                            this.form.id,
                            this.form
                        )
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
