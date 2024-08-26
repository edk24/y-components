<script lang="ts" setup>
import { YImageUploadProps } from './data';

const props = withDefaults(defineProps<YImageUploadProps>(), {
    allowDelete:  true,
    multiple: false,
    clickMode: 'changefile',
    drag: false,
    block: false,
    count: 9,
    modelValue: '',
    gap: 20,
    accept: 'image/*',
})


function handleItemClick(src: string, index: number) {
    if (props.clickMode === 'preview') {
        uni.previewImage({
            current: index,
            urls: props.modelValue as string[]
        })
    } else if (props.clickMode === 'changefile') {
        uni.chooseImage({
            count: props.count - (props.modelValue as string[]).length,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const tempFilePaths = res.tempFilePaths
                const newFiles = [...(props.modelValue as string[]), ...tempFilePaths]
                emit('update:modelValue', newFiles)
            }
        })
    }
}
</script>

<template>

    <view class="y-image-upload">
        <!-- 单图上传 -->
        <template v-if="!props.multiple">

        </template>

        <!-- 块级样式 -->
        <template v-else-if="props.block">

        </template>

        <!-- 多图上传 -->
        <template v-else-if="props.multiple">
            <view class="y-image-upload__list">

            </view>
        </template>

    </view>

</template>

<style lang="scss">
@import './style.scss';
</style>