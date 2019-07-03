<template>
    <div class="lesson-detail">
        <x-card title="课程信息">
            <lesson-form ref="lessonForm"> </lesson-form>
        </x-card>

        <x-card title="目录信息" v-loading="loading" class="catalog-info">
            <div slot="title" v-if="lessonID">
                <el-button
                    type="primary"
                    class="catalog-info-add"
                    size="medium"
                    @click="openDialog(false)"
                    >添加目录</el-button
                >
            </div>
            <el-table :data="data">
                <el-table-column
                    type="index"
                    label-class-name="index-col"
                    class-name="index-col"
                    label="序号"
                    width="70"
                >
                </el-table-column>
                <el-table-column prop="name" width="150" label="目录名称">
                </el-table-column>
                <el-table-column
                    prop="vedio"
                    min-width="200"
                    label="目录视频截图"
                >
                    <template slot-scope="scope">
                        <img
                            :src="scope.row.ppt"
                            width="100"
                            height="100"
                            alt=""
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="desc" min-width="200" label="目录描述">
                </el-table-column>
                <el-table-column label="操作" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="openDialog(scope.row)"
                            >编辑</el-button
                        >
                        <el-button type="text" @click="gotoBindppt(scope.row)"
                            >绑定ppt</el-button
                        >

                        <el-button
                            type="text"
                            class="delete"
                            @click="deleteCatalog(scope.row.id)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <page-pagination
                @currentChange="handleCurrentChange"
                :total="total"
            ></page-pagination>
        </x-card>
        <catalog-dialog
            ref="catalogDialog"
            @onsuccess="addsuccess"
        ></catalog-dialog>
    </div>
</template>

<script>
import { uploadImg } from 'src/api/common'
import { getCatalogList, delCatalog } from 'src/api/lesson'
import { getItem, setItem } from 'src/utils/localStorageUtils'
import catalogDialog from './catalog-dialog'
import lessonForm from './lesson-form'

export default {
    data() {
        return {
            action: uploadImg,
            imgData: { media_type: 1 },
            data: [
                {
                    id: 1,
                    name: '', // 目录名称
                    vedio: '', // 目录视频
                    desc: '', // 目录描述
                    ppt: '' // ppt
                    // 目录列表不显示每张ppt的时间吧
                }
            ],
            total: 0,
            loading: false,
            page: 1
        }
    },
    components: {
        catalogDialog,
        lessonForm
    },
    computed: {
        lessonID() {
            return this.$route.params.id
        }
    },
    methods: {
        gotoBindppt({ id, name }) {
            const data = getItem('peibanData', {})
            setItem('peibanData', {
                ...data,
                lessonID: this.lessonID,
                courseName: this.$refs.lessonForm.form.name,
                catalogName: name
            })
            this.$router.push({ path: `/lesson/catalog-bind-ppt/${id}` })
        },
        addsuccess() {
            this.fetchData()
        },
        beforeUpload() {
            //
        },
        onUploadSuccess(res) {
            if (res.code === 200) {
                this.form.coverPhoto = res.data.media_real_url
                this.form.cover = res.data.media_id
                this.$message.success('上传图片成功')
            } else {
                this.$message.error(`图片上传失败：${res.msg}`)
            }
        },
        onUploadError() {
            this.$message.error('图片上传失败')
        },
        addCatalog() {
            this.form.catalogList.push({})
        },
        openDialog(item) {
            this.$refs.catalogDialog.open(item)
        },
        deleteCatalog(id) {
            this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    delCatalog(this.lessonID, id)
                        .then(() => {
                            this.$message.success('删除目录成功')
                            if (this.data.length === 1) {
                                const prePage = this.page - 1
                                this.page = prePage >= 1 ? prePage : 1
                            }
                            this.fetchData()
                        })
                        .catch(e => {
                            this.$message.error(e.message)
                        })
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
            if (this.loading) {
                return
            }
            this.loading = true

            getCatalogList(this.lessonID, {
                page: page || this.page || 1
            })
                .then(res => {
                    this.data = res.data
                    this.total = res.total
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loading = false
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
.lesson-catalog {
    font-size: 15px;
    font-weight: 400;
    border-bottom: 1px solid @border-color;
    padding-bottom: 15px;
    color: #999;
    margin: 50px 0 30px;
    span {
        padding-left: 20px;
        border-left: 2px solid @color-blue;
    }
}

.catalog-info {
    &-add {
        min-width: 100px;
    }
    .el-table {
        border-left: 1px solid @border-color;
        border-right: 1px solid @border-color;
    }
    .el-dialog .el-button {
        min-width: 100px;
    }
    .delete {
        color: @color-red;
    }
}
</style>
