<template>
    <div class="page-popover-container">
        <el-popover
            placement="bottom"
            popper-class="page-popover"
            :width="width"
            @show="show"
            :disabled="disabled"
            v-model="visible"
            ref="popover"
            trigger="click"
        >
            <div class="page-popover-content">
                <slot></slot>
            </div>
            <div class="page-popover-actions">
                <el-button size="small" @click="confirm" type="primary"
                    >确定</el-button
                >
                <el-button size="small" @click="cancel" plain>取消</el-button>
            </div>
            <template slot="reference">
                <slot name="trigger"></slot>
            </template>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: 'popover',
    props: {
        width: {
            type: Number,
            default: 280
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        confirm() {
            this.visible = false
            this.$emit('confirm')
        },
        cancel() {
            this.visible = false
        },
        show() {
            this.$emit('show')
        }
    }
}
</script>

<style lang="less">
.page-popover-container {
    display: inline-block;
    &.block {
        display: block;
    }
}
.page-popover {
    &-content {
        padding: 20px;
        font-size: 14px;
    }
    &-actions {
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
        button {
            width: 100px;
        }
    }
}
.page-popover {
    .move-group {
        > .el-radio {
            padding-top: 10px;
            float: left;
            // width: 92px;
            overflow: hidden;
            .el-radio__label {
                display: inline-block;
                width: 8em;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        > .el-radio:nth-child(2n + 1) {
            margin-left: 0;
        }
        > .el-radio:nth-child(1),
        > .el-radio:nth-child(2) {
            padding-top: 0;
        }
    }
}
</style>
