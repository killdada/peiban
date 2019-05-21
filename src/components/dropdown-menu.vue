<template>
    <el-popover
        v-model="model"
        width="auto"
        :trigger="trigger"
        :offset="offset"
        @show="show"
        @hide="hide"
        :popper-class="popperClass"
        :placement="placement"
        :visible-arrow="false"
    >
        <template>
            <slot></slot>
        </template>
        <template slot="reference">
            <slot name="reference"></slot>
        </template>
    </el-popover>
</template>

<script>
export default {
    name: 'DropdownMenu',
    props: {
        value: Boolean,
        placement: {
            type: String,
            default: 'bottom-start'
        },
        offset: {
            type: Number,
            default: 0
        },
        trigger: {
            type: String,
            default: 'hover'
        },
        popperClass: {
            type: String,
            default: 'dropdown-menu dropdown-menu-container'
        },
        show: {
            type: Function,
            default: () => this
        },
        hide: {
            type: Function,
            default: () => this
        }
    },
    computed: {
        model: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    }
}
</script>

<style lang="less">
@import '~assets/less/var.less';

// 测试环境审查元素发现有些样式被自带的覆盖了，开发环境是这个样式覆盖自带的没问题，这里修复下
.dropdown-menu.dropdown-menu-container {
    padding: 0;
    &[x-placement^='bottom'] {
        margin-top: 0;
    }
}

.dropdown-menu {
    min-width: 120px;
    max-height: 240px;
    // padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 0 0 4px 4px;
    border: none;
    box-shadow: @shadow-second-menu;

    // &[x-placement^=bottom] {
    //     margin-top: 0;
    // }

    a {
        color: inherit;
    }

    ul {
        ul {
            padding: 0;
        }
        padding: 10px 16px;
        margin: 0;
        list-style: none;
        line-height: 2;
        font-size: 16px;
        color: #6d7283;
        span {
            font-size: 14px;
            color: @color-gray;
        }
        li {
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            transition: color 0.3s;
            &:hover,
            &.router-link-active {
                color: @color-blue;
            }
        }
    }
}
</style>
