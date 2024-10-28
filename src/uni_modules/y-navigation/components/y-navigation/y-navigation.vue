<template>
    <view :class="classList" :style="containterStyle">
        <image v-if="backgroundImage" :src="backgroundImage" :style="bgStyle" mode="aspectFill"></image>

        <view class="y-navigation__main">
            <view class="y-navigation__status-bar" :style="statusBarStyle"></view>
            <view class="y-navigation__body" :style="navigationBarStyle">
                <view class="y-navigation__body-back" @tap="handleBack">
                    <uni-icons type="left" size="24" :color="color" v-if="hasPrevPage"></uni-icons>
                </view>
                <view class="y-navigation__body-title" :style="titleStyle">
                    <template v-if="title">
                        <text :style="titleStyle">{{ title }}</text>
                    </template>

                    <template v-else>
                        <slot></slot>
                    </template>
                </view>
                <view class="y-navigation__body-extend">
                    <slot name="extend"></slot>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getNavigationBarInfo } from './utils';
import { computed } from 'vue';

let navigationBarInfo = {
    statusBarHeight: 0,
    navigationHeight: 44
}

// #ifdef MP
navigationBarInfo = getNavigationBarInfo()
// #endif

// #ifdef APP-PLUS
navigationBarInfo = {
    statusBarHeight: uni.getWindowInfo().statusBarHeight || 0,
    navigationHeight: 44
}
// #endif


interface Props {
    // 是否显示返回按钮
    showBack?: boolean;
    // 字体颜色
    color?: 'white' | 'black';
    // 背景颜色，支持背景色、渐变色
    backgroundColor?: string;
    // 背景图片
    backgroundImage?: string;
    // 字体大小, 仅 custom 类型生效
    fontSize?: string | number;
    // 是否固定在顶部
    fixed: boolean;
    // 导航栏名称
    title?: string;
}

const props = withDefaults(defineProps<Props>(), {
    showBack: true,
    color: 'black',
    backgroundColor: 'linear-gradient(135deg, #0498FB 0%, #5359EE 100%)',
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

const containterStyle = computed(() => {
    let style: AnyObject = {
        'background-image': props.backgroundColor,
        'height': (navigationBarInfo.navigationHeight + navigationBarInfo.statusBarHeight) + 'px',
    }
    return style
})


const bgStyle = computed(() => {
    return {
        width: '100%',
        height: '100%',
    }
})

const statusBarStyle = computed(() => {
    return {
        height: navigationBarInfo.statusBarHeight + 'px',
    }
})

const navigationBarStyle = computed(() => {
    return {
        height: navigationBarInfo.navigationHeight + 'px',
    }
})

const titleStyle = computed(() => {
    let style: AnyObject = {
        fontSize: props.fontSize + (typeof props.fontSize === 'number' ? 'rpx' : ''),
        color: props.color,
        fontWeight: 'normal'
    }

    // #ifdef MP
    style['fontWeight'] = 'bold';
    // #endif

    return style;
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