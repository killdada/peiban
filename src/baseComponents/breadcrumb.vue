<template>
    <div class="page-breadcrumb">
        <el-breadcrumb
            separator="/"
            :class="{ 'el-breadcrumb--intent': intent }"
        >
            <el-breadcrumb-item
                v-for="route of routes"
                :to="route.to"
                :key="getRouteKey(route)"
                >{{ route.name }}</el-breadcrumb-item
            >
        </el-breadcrumb>
        <div class="slot-right">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumb',
    props: {
        routes: {
            type: Array,
            required: true
        },
        intent: Boolean
    },
    methods: {
        getRouteKey(route) {
            if (route.to) {
                return `${route.name}::${route.to.toString()}`
            }
            return route.name
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/less/var.less';

.page-breadcrumb {
    display: flex;
    align-items: center;
    // height: 60px;
    .slot-right {
        flex: auto 0 0;
        padding-right: 20px;
    }
    .el-breadcrumb {
        flex: 100% 1 1;
        // height: @height-breadcrumb + 8px;
        padding: 20px 0;
        &__item {
            &:first-child:not(:last-child) {
                padding-left: 20px;
                background: url('../assets/img/back.png') left center / contain
                    no-repeat;
            }
        }
        &.el-breadcrumb--intent {
            padding: 20px;
        }
    }
}
</style>
