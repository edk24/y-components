<template>
    <view class="y-safe-top" :style="{ '--y-safe-top': safeTop }"> </view>
</template>
<script lang="ts" setup>
import { computed } from "vue";

// 安全区域顶部高度
const safeTop = computed(() => {
    const safeArea = uni.getWindowInfo().safeArea;
    return (safeArea.top || 0) + "px";
});
</script>

<style>
.y-safe-top {
    --y-safe-top: 0;
    height: var(--y-safe-top);
    width: 100%;
}
</style>
