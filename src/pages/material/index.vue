<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="视频管理" name="vedio">视频管理</el-tab-pane>
        <el-tab-pane label="音频管理" name="audio">音频管理</el-tab-pane>
    </el-tabs>
</template>

<script>
import { getMemberList, getMemberStudyList, reportLink } from 'src/api/member'

export default {
    data() {
        return {
            activeName: 'vedio',
            data: [],
            loading: false,
            total: 0,
            // key: '',
            showDialog: false,
            id: '', // 当前编辑的id,name
            loadingDetail: false,
            totalRecord: 0,
            dataRecord: [],
            reportLink,
            page: 1,
            pageRecord: 1
        }
    },
    components: {},
    methods: {
        handleClick() {},
        format(time) {
            const n = parseInt(time, 10)
            const a = parseInt(n / 60, 10) // 多少分钟
            const b = n % 60 // 余数秒
            if (a >= 60) {
                const c = a % 60 // 余数分
                const d = parseInt(a / 60, 10) // 多少小时
                return `${d}时${c}分${b}秒`
            }
            return `${a}分${b}秒`
        },
        createReport() {
            //
        },
        handleCurrentChange(val) {
            this.page = val
            this.fetchData(val)
        },
        handleCurrentChangeRecord(val) {
            this.pageRecord = val
            this.fetchDetail(val)
        },
        fetchData(page) {
            if (this.loading) {
                return
            }
            this.loading = true

            getMemberList({
                page: page || this.page || 1
            })
                .then(res => {
                    this.data = res.list
                    this.total = res.sum
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loading = false
                })
        },

        gotoEdit(item) {
            this.showDialog = true
            this.id = item.username
            this.fetchDetail()
        },
        fetchDetail(page) {
            if (this.loadingDetail) {
                return
            }
            this.loadingDetail = true

            getMemberStudyList(this.id, {
                page: page || this.pageRecord || 1
            })
                .then(res => {
                    this.dataRecord = res.list
                    this.totalRecord = res.sum
                })
                .catch(e => {
                    this.$message.error(e.message)
                })
                .finally(() => {
                    this.loadingDetail = false
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
.Member-form {
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
.page-Member-list {
    height: 100%;
    background-color: #fff;
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
