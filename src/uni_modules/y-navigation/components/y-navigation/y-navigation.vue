<template>
    <view :class="classList" :style="styleList">
        <view class="y-navigation__back">
            <uni-icons type="left" size="24" :color="color" v-if="hasPrevPage" @tap="handleBack"></uni-icons>
        </view>
        <view class="y-navigation__title">
            <slot></slot>
        </view>
        <view class="y-navigation__extend">
            <slot name="extend"></slot>
        </view>
    </view>
</template>

<script setup lang="ts">
import { compareVersion } from './utils';
import { computed } from 'vue';

interface Props {
    // 是否显示返回按钮
    showBack: boolean;
    // 类型
    type: 'default' | 'custom';
    // 字体颜色
    color: 'white' | 'black';
    // 背景颜色，支持背景色、渐变色
    background: string;
    // 是否显示状态栏，仅 custom 类型生效
    showStatusBar: boolean;
    // 字体大小, 仅 custom 类型生效
    fontSize: string | number;
}

const props = withDefaults(defineProps<Props>(), {
    showBack: true,
    type: 'default',
    color: 'white',
    background: 'linear-gradient(135deg, #0498FB 0%, #5359EE 100%)',
    showStatusBar: true,
    fontSize: '34rpx'
})


const statusHeight = computed(() => {
    if (!props.showStatusBar) {
        return 1;
    }

    // #ifndef MP-WEIXIN
    // 非微信小程序
    return uni.getWindowInfo().statusBarHeight || 1;
    // #endif

    // #ifdef MP-WEIXIN
    // 微信小程序 + 兼容处理
    if (compareVersion('2.20.1') >= 0) {            // 2.20.1 以上版本支持
        return uni.getWindowInfo().statusBarHeight;
    } else {
        return uni.getSystemInfoSync().statusBarHeight || 0;
    }
    // #endif
})

const classList = computed(() => {
    const list = ['y-navigation'];

    if (props.type == 'default') {
        list.push('y-navigation__native');
    } else if (props.type == 'custom') {
        list.push('y-navigation__custom');
    }
    return list;
})

const styleList = computed(() => {
    let style: AnyObject = {
        '--y-navigation-bar-background': props.background,
        '--y-navigation-bar-color': props.color,
        '--y-navigation-status-bar-height': `${statusHeight.value}rpx`
    }


    if (props.type == 'custom') {
        style['--y-navigation-font-size'] = props.fontSize + (typeof props.fontSize === 'number' ? 'rpx' : '');
    }

    return style
})

// 是否有上一页
const hasPrevPage = computed(() => {
    return props.showBack && getCurrentPages().length > 1;
})

function handleBack() {
    uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.y-navigation {
    display: flex;
    color: #fff;
    line-height: 50.12rpx;
    box-sizing: border-box;
    z-index: 9999;
    position: relative;

    // 兼容刘海屏
    // padding-top: 0;
    // padding-top: constant(safe-area-inset-top);
    // padding-top: env(safe-area-inset-top);

    --y-navigation-bar-background: #456dea;
    --y-navigation-bar-color: white;
    --y-navigation-status-bar-height: var(--window-top);

    &__native {
        // #ifdef H5
        --y-navigation-bar-height: 88rpx;
        // #endif
        // #ifndef H5
        --y-navigation-bar-height: calc(130rpx + var(--y-navigation-status-bar-height));
        // #endif

        background: var(--y-navigation-bar-background);
        color: var(--y-navigation-bar-color);
        height: var(--y-navigation-bar-height) !important;
        line-height: var(--y-navigation-bar-height) !important;
        font-size: 28rpx;
        padding-top: var(--status-bar-height);
    }

    &__custom {
        --y-navigation-font-size: 34rpx;
        // #ifdef H5
        --y-navigation-bar-height: 88rpx;
        // #endif
        // --y-navigation-bar-height: calc(64rpx + var(--y-navigation-status-bar-height));
        // #ifndef H5
        --y-navigation-bar-height: calc(130rpx + var(--y-navigation-status-bar-height));
        // #endif
        font-size: var(--y-navigation-font-size);
        background: var(--y-navigation-bar-background);
        color: var(--y-navigation-bar-color);
        height: var(--y-navigation-bar-height);
        line-height: var(--y-navigation-bar-height);
        // padding-top: calc(var(--status-bar-height) / 2);
        padding-top: 0;
        padding-top: calc(constant(safe-area-inset-top) + var(--status-bar-height));
        padding-top: calc(env(safe-area-inset-top) + var(--status-bar-height));
    }

    &__back {
        width: 60rpx;
        margin-left: 10rpx;

        .iconfont {
            font-weight: 400 !important;
            font-size: 40rpx;
        }
    }

    &__title {
        flex: 1;
        font-weight: 400;
        text-align: center;
    }

    &__extend {
        min-width: 70rpx;
    }
}
</style>