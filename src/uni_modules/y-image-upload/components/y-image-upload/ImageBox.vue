<template>
    <view class="y-image-upload__item" @tap="handleItemClick([modelValue.toString()], 0)">
        <template v-if="modelValue.toString() != ''">
            <image mode="aspectFill" />
            <view class="y-image-upload__item__delete" v-if="props.allowDelete" @click="emit('update:modelValue', '')">
                <text>删除</text>
            </view>
        </template>

        <template v-else>
            <uni-icons type="plusempty" color="#A6A6A6" size="28"></uni-icons>
            <view class="y-image-upload__item-placeholder">上传图片</view>
        </template>
    </view>
</template>

<script lang="ts" setup>
interface Props {
    showDelete: boolean
    modelValue: string
}
</script>