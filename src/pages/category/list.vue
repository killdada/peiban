<template>
    <div class="page-Category-list">
        <header>
            <div class="tips">
                排序设定会影响在app端的展示顺序。排序规则,大的排前面，如果排序值一样，时间距离当前最近的排前面
            </div>
            <!-- <el-input placeholder="请输入搜索信息"
                suffix-icon="el-icon-search"
                @keyup.enter.native="searchData"
                size="medium"
                v-model.trim="key">
            </el-input> -->
            <el-button
                type="primary"
                @click="gotoAdd"
                icon="el-icon-plus"
                size="medium"
                >新增</el-button
            >
        </header>
        <el-table :data="data" v-loading="loading">
            <el-table-column
                type="index"
                label-class-name="index-col"
                class-name="index-col"
                label="序号"
                width="70"
            >
            </el-table-column>
            <el-table-column prop="name" min-width="200" label="名称">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">{{
                    statusMap[scope.row.status]
                }}</template>
            </el-table-column>
            <el-table-column prop="sort_val" label="排序"> </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="gotoEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="text"
                        v-if="scope.row.status === 0 || scope.row.status === 2"
                        @click="publish(scope.row)"
                        >发布</el-button
                    >
                    <el-button
                        type="text"
                        v-if="scope.row.status === 1"
                        @click="down(scope.row)"
                        >下架</el-button
                    >
                    <el-button
                        type="text"
                        class="delete"
                        @click="deleteCategory(scope.row.id)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <page-pagination
            :pageSize="10"
            @currentChange="handleCurrentChange"
            :total="total"
        ></page-pagination>

        <el-dialog
            :title="!id ? '新建分类' : '编辑分类'"
            width="700px"
            @close="reset"
            :visible.sync="showDialog"
        >
            <div class="Category-form" v-loading="loadingDetail">
                <el-form
                    :model="form"
                    :rules="rules"
                    label-position="left"
                    label-width="100px"
                    ref="form"
                >
                    <el-form-item label="分类名称" prop="name">
                        <el-input
                            v-model.trim="form.name"
                            placeholder="请输入分类名称"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort_val">
                        <el-input-number
                            v-model="form.sort_val"
                            :min="1"
                            label="请输入排序"
                        ></el-input-number>
                    </el-form-item>
                </el-form>
                <div class="submit-btn">
                    <el-button
                        type="primary"
                        @click="save"
                        :loading="btnloading"
                        size="medium"
                        >保存</el-button
                    >
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getCategoryList,
    delCategory,
    getCategoryDetail,
    addCategory,
    updateCategory,
    publishCategory,
    downCategory
} from 'src/api/category'

export default {
    data() {
        return {
            data: [],
            loading: false,
            total: 0,
            key: '',
            showDialog: false,
            id: '', // 当前编辑的id
            form: {
                name: '', // 课程名称
                sort_val: ''
            },
            rules: {
                name: {
                    message: '分类名称不能为空',
                    required: true,
                    trigger: ['blur']
                },
                sort_val: {
                    message: '排序不能为空',
                    required: true,
                    trigger: ['blur']
                }
            },
            loadingDetail: false,
            btnloading: false,
            page: 1,
            statusMap: {
                0: '待发布',
                1: '已发布',
                2: '已下架'
            }
        }
    },
    components: {},
    methods: {
        // 发布这个分类
        publish(item) {
            this.$confirm('请确认该分类下是否已经编辑好课程?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    publishCategory(item.id)
                        .then(() => {
                            this.$message.success('发布分类成功')
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
        // 下架
        down(item) {
            downCategory(item.id)
                .then(() => {
                    this.$message.success('下架分类成功')
                    this.fetchData()
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
        },
        refreshData() {
            this.fetchData()
            this.showDialog = false
        },
        gotoAdd() {
            this.showDialog = true
            this.id = ''
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

            getCategoryList({
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
        },

        deleteCategory(id) {
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    delCategory(id)
                        .then(() => {
                            this.$message.success('删除分类成功')
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
        gotoEdit(item) {
            this.showDialog = true
            this.id = item.id
            this.fetchDetail()
        },
        beforeUpload() {
            //
        },
        onUploadSuccess(res) {
            if (res.code === 200) {
                this.form.imgUrl = res.data.media_real_url
                this.form.img = res.data.media_id
                this.$message.success('上传图片成功')
            } else {
                this.$message.error(`图片上传失败：${res.msg}`)
            }
        },
        onUploadError() {
            this.$message.error('图片上传失败')
        },
        save() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.btnloading) {
                        return
                    }
                    this.btnloading = true
                    if (!this.id) {
                        addCategory(this.form)
                            .then(() => {
                                this.$message.success('添加成功')
                                this.showDialog = false
                                this.fetchData()
                            })
                            .catch(e => {
                                this.$message.error(e.message)
                            })
                            .finally(() => {
                                this.btnloading = false
                            })
                    } else {
                        updateCategory(this.id, this.form)
                            .then(() => {
                                this.$message.success('保存成功')
                                this.showDialog = false
                                this.fetchData()
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
        },
        fetchDetail() {
            if (this.loadingDetail) {
                return
            }
            this.loadingDetail = true

            getCategoryDetail(this.id)
                .then(res => {
                    this.form = res
                    this.$refs.form.clearValidate()
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loadingDetail = false
                })
        },
        reset() {
            this.$refs.form && this.$refs.form.resetFields()
        }
    },
    created() {
        this.fetchData()
    }
}
</script>

<style lang="less" scoped>
@import '~assets/less/var.less';
.Category-form {
    .el-input,
    .el-textarea,
    .el-select {
        width: 400px;
    }
}
.submit-btn {
    margin: 30px 0 10px;
    text-align: right;
    button {
        min-width: 100px;
    }
}
.page-Category-list {
    background-color: #fff;
    .tips {
        color: @color-gray;
        font-size: 12px;
        line-height: 36px;
    }
    header {
        padding: 15px 20px;
        text-align: right;
        display: flex;
        justify-content: space-between;
        .el-input {
            width: 300px;
        }
    }
    .el-button.delete {
        color: @color-red;
    }
}
</style>
