<template>
    <div class="page-pagination clearfix">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            background
            layout="prev, pager, next, jumper"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'pagePagination',
    props: {
        total: Number,
        pageSize: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            currentPage: 1
            // total: 0,
            // pageSize: 16,
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('sizeChange', val)
        },
        handleCurrentChange(val) {
            this.$emit('currentChange', val)
        }
    }
}
</script>

<style lang="less" scoped>
.page-pagination {
    width: 100%;
    padding: 20px;
    background-color: #fff;
    .el-pagination {
        float: right;
    }
}
</style>
