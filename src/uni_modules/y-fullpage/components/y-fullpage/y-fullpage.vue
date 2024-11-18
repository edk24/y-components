<template>
    <swiper ref="swiperRef" class="y-fullpage" :current-item-id="currentItem" @change="onChange" vertical
        :circular="props.circular">
        <slot></slot>
    </swiper>
</template>
<script lang="ts" setup>

interface Props {
    // 是否循环
    circular: boolean
    // 当前页码
    currentItem: string
}

const props = withDefaults(defineProps<Props>(), {
    circular: false,
    currentItem: '',
})
const emit = defineEmits(['onChange'])

function onChange(e: any) {
    const {
        currentItemId
    } = e.detail
    emit('onChange', currentItemId)
}
</script>
<style lang="scss">
.y-fullpage {
    display: flex;
    width: 100vw;
    height: 100vh;
}
</style>
