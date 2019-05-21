<template>
    <div class="x-title" v-if="title" :class="size ? `x-title--${size}` : ''">
        <span class="x-title-icon"></span>
        <p v-if="title" :title="title">{{ title }}</p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'XTitle',

    props: {
        size: String,
        title: String
    }
}
</script>

<style lang="less">
@import '~assets/less/var.less';

.x-title {
    display: flex;
    padding: 18px 0;
    align-items: center;
    &-icon {
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border-radius: 50%;
        border: 3px solid @color-blue;
    }
    p {
        flex: auto 1 1;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 700;
        font-size: 16px;
        line-height: 1.5;
    }

    &.x-title--large {
        padding: 24px 0;
        p {
            color: #333333;
            font-size: 24px;
        }
    }
}
</style>
