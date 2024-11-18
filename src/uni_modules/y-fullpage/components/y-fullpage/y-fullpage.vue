<template>
    <swiper class="y-fullpage" :current-item-id="currentItem" @change="onChange" vertical :circular="props.circular">
        <slot></slot>
    </swiper>
</template>
<script lang="ts" setup>

interface Props {
    // 是否循环
    circular: boolean
    // 当前页码
    currentItem: number
    // 当前页码变化
    onChange: (currentItem: number) => void
}

const props = withDefaults(defineProps<Props>(), {
    circular: false,
    currentItem: 0,
    onChange: () => {}
})

</script>
<style lang="scss">
.y-fullpage {
    display: flex;
    width: 100vw;
    height: 100vh;
    background: red;
}
</style>
