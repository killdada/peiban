<template>
    <div class="page-material-manage">
        <header>
            <el-input
                placeholder="请输入素材标题"
                suffix-icon="el-icon-search"
                @keyup.enter.native="fetchData"
                size="medium"
                v-model.trim="key"
            >
            </el-input>
            <el-button
                type="primary"
                class="page-material-manage__add"
                @click="openDialog"
                size="medium"
            >
                <a style="color: #fff">上传素材</a>
            </el-button>
        </header>

        <el-table :data="data" v-loading="loading.list">
            <el-table-column
                type="index"
                label-class-name="index-col"
                class-name="index-col"
                label="序号"
                width="70"
            >
            </el-table-column>
            <el-table-column prop="show_name" min-width="200" label="素材标题">
            </el-table-column>
            <el-table-column label="素材类型">
                <template slot-scope="{ row }">
                    {{ row.media_type === 3 ? '视频' : '音频' }}
                </template>
            </el-table-column>
            <el-table-column min-width="200" label="素材大小">
                <template slot-scope="{ row }">
                    {{ Math.ceil(row.size / 1024 / 1024) }} MB
                </template>
            </el-table-column>
            <el-table-column prop="created_at" min-width="200" label="创建时间">
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="openEdit(scope.row)"
                        >编辑</el-button
                    >
                    <!-- <el-button type="text"
                        class="delete"
                        @click="deleteMaterial(scope.row.id)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <page-pagination
            :pageSize="10"
            @currentChange="handleCurrentChange"
            :total="total"
        ></page-pagination>
        <el-dialog
            title="上传素材"
            :close-on-click-modal="false"
            width="900px"
            class="upload-dialog"
            :visible.sync="showDialog"
        >
            <div class="upload-dialog__tips">
                单个素材最好不超过5G
            </div>
            <div class="upload-dialog__content">
                <div id="uploadvideo-container">
                    <el-button
                        type="primary"
                        @click="selectFile"
                        size="medium"
                        icon="el-icon-plus"
                        >选择文件</el-button
                    >
                    <div class="file-input">
                        <input
                            type="file"
                            id="uploadinput"
                            multiple
                            @change="changefile"
                            accept="video/*,audio/*"
                        />
                    </div>
                </div>
                <el-table :data="fileList">
                    <el-table-column
                        type="index"
                        label-class-name="index-col"
                        class-name="index-col"
                        label="序号"
                        width="70"
                    >
                    </el-table-column>
                    <el-table-column prop="name" min-width="100" label="文件名">
                    </el-table-column>
                    <el-table-column label="文件大小">
                        <template slot-scope="{ row }">
                            {{ Math.ceil(row.size / 1024 / 1024) }} M
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="300">
                        <template slot-scope="{ row }">
                            <div class="file-action-wrapper">
                                <el-progress
                                    :text-inside="true"
                                    :stroke-width="20"
                                    :percentage="row.percent"
                                ></el-progress>
                                <el-button
                                    @click="fileSingleAction(row)"
                                    v-if="row.status !== 'completed'"
                                    size="small"
                                    >{{ getBtnText(row.status) }}</el-button
                                >
                                <el-button v-else size="small"
                                    >已完成</el-button
                                >
                                <el-button
                                    @click="deleteFileItem(row)"
                                    size="small"
                                    >删除</el-button
                                >
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="batch-btn" v-if="fileList.length">
                    <div>
                        <el-button size="small" @click="fileActionAll"
                            >全部开始上传</el-button
                        >
                        <el-button size="small" @click="fileActionAll('pause')"
                            >全部暂停上传</el-button
                        >
                        <el-button size="small" @click="fileActionAll"
                            >全部继续上传</el-button
                        >
                    </div>
                    <div>
                        <el-button
                            size="medium"
                            type="primary"
                            class="save-btn"
                            :loading="loading.saveMaterial"
                            @click="saveMaterial"
                            >保存</el-button
                        >
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="素材编辑"
            :close-on-click-modal="false"
            width="700px"
            class="edit-dialog"
            :visible.sync="showEditDialog"
        >
            <el-form ref="form" :model="form" label-width="80px" size="small">
                <el-form-item label="素材标题">
                    <el-input
                        style="width: 300px;"
                        v-model="form.name"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div class="clearfix">
                <el-button type="primary" @click="saveEdit" size="small"
                    >保存</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { saveMaterial, getMaterials, updateMaterial } from 'src/api/material'
import { qiniuUpload, pauseUpload } from 'src/utils/qiniu'

export default {
    data() {
        return {
            data: [],
            page: 1,
            total: 0,
            showDialog: false,
            showEditDialog: false,
            form: {},
            loading: {
                list: false,
                editFormBtn: false,
                addMaterialBtn: false,
                saveMaterial: false
            },
            fileList: [],
            key: ''
        }
    },
    components: {},
    methods: {
        deleteFileItem(row) {
            const actualIndex = this.fileList.findIndex(
                item => item.index === row.index
            )
            if (actualIndex !== -1) {
                // 先暂停上传，再删除文件
                this.pauseUpload(row)
                this.$delete(this.fileList, actualIndex)
            }
        },
        async saveMaterial() {
            if (this.loading.saveMaterial) {
                return
            }
            this.loading.saveMaterial = true
            try {
                const list = []
                const newFileList = []
                this.fileList.forEach(item => {
                    if (item.status === 'completed') {
                        list.push({
                            media_type: item.media_type,
                            show_name: item.name,
                            media_id: item.key
                        })
                    } else {
                        // 后续只显示没有保存的文件
                        newFileList.push(item)
                    }
                })
                if (list.length) {
                    await saveMaterial({
                        list
                    })
                    this.$message.success('已经上传完成的视频保存成功')
                    this.fileList = newFileList
                    this.fetchData()
                    // 全部都已经上传保存完成的情况下关闭弹窗。如果还有一个没有上传保存完成，弹窗不关闭
                    if (!this.fileList.length) {
                        this.showDialog = false
                    }
                } else {
                    this.$message.info('没有一个素材上传成功，无法保存')
                }
            } catch (error) {
                //
            }
            this.loading.saveMaterial = false
        },
        getBtnText(status) {
            let text = '开始上传'
            switch (status) {
                case 'paused':
                case 'error':
                    text = '继续上传'
                    break
                case 'start':
                    text = '暂停上传'
                    break
                default:
                    break
            }
            return text
        },
        // 如果有删除某个项的话，那么就不能直接用row里面最开始注入的index了，而应该先找到这个index
        updateFileItem(params, row) {
            const actualIndex = this.fileList.findIndex(
                item => item.index === row.index
            )
            if (actualIndex !== -1) {
                this.$set(this.fileList, actualIndex, {
                    ...this.fileList[actualIndex],
                    ...params
                })
            }
        },
        pauseUpload(row) {
            pauseUpload(row, this.updateFileItem)
        },
        startUpload(row) {
            qiniuUpload(row, this.updateFileItem)
        },

        fileSingleAction(row, forceStop) {
            const { status = null } = row
            if (status === 'completed') return
            if (status === 'start' || forceStop) {
                this.pauseUpload(row)
            } else {
                this.updateFileItem({ status: 'start' }, row)
                this.startUpload(row)
            }
        },
        fileActionAll(type) {
            this.fileList.forEach(item => {
                this.fileSingleAction(item, type === 'pause')
            })
        },
        changefile() {
            const files = document.getElementById('uploadinput').files
            const result = []
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                // 同一个文件不需要操作
                if (
                    !this.fileList.find(
                        item =>
                            item.name === file.name && item.size === file.size
                    )
                ) {
                    result.push({
                        file,
                        name: file.name,
                        size: file.size,
                        percent: 0,
                        status: null
                    })
                }
            }
            this.fileList = this.fileList
                .concat(result)
                .map((item, i) => ({ ...item, index: i }))
        },
        selectFile() {
            document.getElementById('uploadinput').click()
        },
        handleClick() {
            this.page = 1
            this.fileList = []
            this.fetchData()
        },
        openDialog() {
            this.showDialog = true
        },
        openEdit(row) {
            this.form = { name: row.show_name, id: row.id }
            this.showEditDialog = true
        },
        async saveEdit() {
            if (!this.form.name) {
                return this.$message.info('标题不能为空')
            }
            if (this.loading.editFormBtn) {
                return
            }
            this.loading.editFormBtn = true
            try {
                await updateMaterial(this.form.id, {
                    show_name: this.form.name
                })
                this.$message.success('修改素材标题成功')
                this.showEditDialog = false
                this.fetchData()
            } catch (error) {
                this.$message.error(error.msg || '修改素材标题失败')
            }
            this.loading.editFormBtn = false
        },
        deleteMaterial() {
            this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    //
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },

        handleCurrentChange(val) {
            this.page = val
            this.fetchData(val)
        },
        fetchData(page) {
            if (this.loading.list) {
                return
            }
            this.loading.list = true

            getMaterials({
                page: page || this.page || 1,
                media_type: '',
                show_name: this.key || ''
            })
                .then(res => {
                    this.data = res.data
                    this.total = res.total
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loading.list = false
                })
        }
    },
    created() {
        this.fetchData()
    }
}
</script>

<style lang="less" scoped>
@import '~assets/less/var.less';
.file-action-wrapper {
    display: flex;
    .el-progress {
        width: 250px;
        margin-right: 10px;
    }
}
.upload-dialog {
    &__content {
        .el-table {
            border-left: 1px solid @border-color;
            border-right: 1px solid @border-color;
        }
        .batch-btn {
            margin-top: 20px;
            text-align: right;
            .save-btn {
                margin-top: 20px;
                min-width: 200px;
            }
        }
    }
}
#uploadvideo-container {
    position: relative;
    margin: 10px 0;
    .el-button {
        position: relative;
        z-index: 1;
        min-width: 140px;
    }
    .file-input {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 140px;
        height: 40px;
        overflow: hidden;
        z-index: 0;
        input {
            font-size: 999px;
            opacity: 0;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
    }
}
.page-material-manage {
    background-color: #fff;
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-input {
            width: 400px;
            margin-left: 20px;
        }
    }
    &__add {
        float: right;
        margin: 20px;
    }
    .delete {
        color: @color-red;
    }
}
.edit-dialog {
    .el-button {
        float: right;
        min-height: 32px;
        min-width: 80px;
    }
}
</style>
