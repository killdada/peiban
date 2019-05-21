<template>
    <div
        class="app-card"
        @mouseleave="closeAction"
        :class="{ 'add-card': isAdd }"
    >
        <div class="img">
            <img v-if="!isAdd" :src="icon || defaultImg" :alt="title" />
        </div>
        <template v-if="canOperation">
            <div
                class="action-icon"
                @click.stop.prevent="toggleAction"
                v-if="!isAdd"
            >
                <i class="el-icon-more"></i>
                <div class="action-btn" v-if="showAction">
                    <div class="delete" @click.stop.prevent="$emit('delete')">
                        删除应用
                    </div>
                </div>
            </div>
        </template>
        <h3 :title="title">{{ title }}</h3>
    </div>
</template>

<script>
export default {
    name: 'AppCard',
    data() {
        return {
            defaultImg: require('src/assets/img/sign_app_def.png'),
            showAction: false
        }
    },

    props: {
        id: String,
        icon: String,
        title: {
            type: String,
            required: true
        },
        isAdd: Boolean,
        canOperation: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        toggleAction() {
            this.showAction = !this.showAction
        },
        closeAction() {
            this.showAction = false
        }
    }
}
</script>

<style lang="less">
@import '~assets/less/var.less';

.app-card {
    display: inline-block;
    position: relative;
    padding-top: 36px;
    width: 160px;
    height: 160px;
    border-radius: 4px;
    vertical-align: bottom;
    box-shadow: @shadow-base;
    background: #fff;
    text-align: center;
    cursor: pointer;

    > div {
        height: 64px;
        width: 64px;
        margin: 0 auto;
    }
    .img,
    h3 {
        overflow: hidden;
    }
    img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
    }

    .action-icon {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 0;
        right: 8px;
        transition: all 0.3s;
        opacity: 0;
        i {
            font-size: 28px;
            color: #e0e1ea;
        }
    }
    .action-btn {
        position: absolute;
        left: 34px;
        top: 0px;
        width: 96px;
        // height: 84px;
        text-align: center;
        background-color: #fff;
        z-index: 1;
        padding: 10px;
        font-size: 14px;
        box-shadow: 8px 8px 16px 0 rgba(184, 187, 214, 0.3);
        border-radius: 4px;
        > div {
            line-height: 1.8;
        }
        .copy {
            color: @color-blue;
        }
        .delete {
            color: @color-red;
        }
    }

    h3 {
        display: -webkit-box;
        margin: 16px 0;
        padding: 0 16px;
        line-height: 20px;
        font-weight: 400;
        color: #6d7283;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: break-all;
        /*! autoprefixer: off */
        -moz-box-orient: vertical;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        /*! autoprefixer: on */
    }

    &:hover {
        .action-icon {
            opacity: 1;
        }
    }

    &.add-card {
        background-image: none;
        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 40px;
            height: 6px;
            top: 64px;
            left: 60px;
            background: #d3d8e9;
        }
        &::after {
            transform: rotate(90deg);
        }
        h3 {
            color: @color-gray;
        }
    }
}
</style>
