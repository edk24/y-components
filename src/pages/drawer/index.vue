<template>
    <view class="example">
        <view>来个演示</view>
        <button @tap="drawerRef.open()">打开抽屉</button>
        <y-drawer ref="drawerRef" :length="500" title="授权用户资料" >
            测试
        </y-drawer>
    </view>

</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawerRef = ref();

</script>
