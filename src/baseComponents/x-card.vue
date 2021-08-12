<template>
    <div class="x-card">
        <div class="x-card__title">
            <x-title :title="title">
                <slot name="title"></slot>
            </x-title>
        </div>
        <div
            class="x-card__header"
            v-if="$slots.header && $slots.header.length"
        >
            <slot name="header"></slot>
        </div>
        <div class="x-card__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import XTitle from './x-title'

export default {
    name: 'XCard',

    props: {
        title: String
    },

    components: { XTitle }
}
</script>

<style lang="less">
@import '../assets/less/var.less';

.x-card {
    margin-bottom: 20px;
    background: #ffffff;
    box-shadow: @shadow-page;
    &__title {
        padding: 0 20px;
    }
    &__content {
        position: relative;
        padding: 20px;
        > .el-form {
            padding: 0 20px;
        }
    }
}
</style>
