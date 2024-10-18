<template>
    <!-- <view  style="width: 100%; background-color: red; height: 20px;"></view> -->
    <view :class="classList" :style="styleList">
        <view class="y-navigation__status-bar"></view>
        <view class="y-navigation__body">
            <view class="y-navigation__body-back" @tap="handleBack">
                <uni-icons type="left" size="24" :color="color" v-if="hasPrevPage"></uni-icons>
            </view>
            <view class="y-navigation__body-title">
                <slot></slot>
            </view>
            <view class="y-navigation__body-extend">
                <slot name="extend"></slot>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getNavigationBarInfo } from './utils';
import { computed } from 'vue';

const navigationBarInfo = getNavigationBarInfo()

interface Props {
    // 是否显示返回按钮
    showBack: boolean;
    // 字体颜色
    color: 'white' | 'black';
    // 背景颜色，支持背景色、渐变色
    background: string;
    // 字体大小, 仅 custom 类型生效
    fontSize: string | number;
    // 是否固定在顶部
    fixed: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showBack: true,
    color: 'black',
    background: 'linear-gradient(135deg, #0498FB 0%, #5359EE 100%)',
    fontSize: '30rpx',
    fixed: true
})


const classList = computed(() => {
    const list = ['y-navigation', 'y-navigation__native'];

    if (props.fixed) {
        list.push('y-navigation__fixed');
    }

    return list;
})

const styleList = computed(() => {
    let style: AnyObject = {
        '--y-navigation-bar-background': props.background,
        '--y-navigation-bar-color': props.color,
        '--y-navigation-status-bar-height': `${navigationBarInfo.statusBarHeight}px`,
        '--y-navigation-height': `${navigationBarInfo.navigationHeight}px`,
        '--y-navigation-font-size': props.fontSize + (typeof props.fontSize === 'number' ? 'rpx' : ''),
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

<style lang="scss">
@import './style.scss';
</style>