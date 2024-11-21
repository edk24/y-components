<template>

    <view class="y-image-upload">
        <!-- 单图上传 -->
        <template v-if="!props.multiple">
            <div class="y-image-upload__item">
                <template v-if="modelValue.toString() != ''">
                    <image mode="aspectFill" @tap="handleItemClick([modelValue.toString()], 0)" />
                    <view class="y-image-upload__item__delete" v-if="props.allowDelete"
                        @click="emit('update:modelValue', '')">
                        <text>删除</text>
                    </view>
                </template>
                
                <template v-else>

                </template>

            </div>
        </template>

        <!-- 多图上传 -->
        <template v-else-if="props.multiple">
            <view class="y-image-upload__list">

            </view>
        </template>

        <!-- 块级样式 -->
        <template v-else-if="props.block">

        </template>



    </view>

</template>

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
const emit = defineEmits(['update:modelValue'])

/**
 * 生成缩略图地址
 */
function getThumbnailUrl(path: string) {
    return `${props.baseUrl}${path}${props.suffix}`
}


/**
 * 点击图片
 */
function handleItemClick(srcs: string[], index: number = 0) {
    if (props.clickMode === 'preview') {
        uni.previewImage({
            current: index,
            urls: srcs
        })
    } else if (props.clickMode === 'changefile') {
        uni.chooseImage({
            count: props.count - (props.modelValue as string[]).length,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
        })
            .then((res) => {
            
                const files = res.tempFiles as File[]
                const newUrls = files.map(async (file) => {
                    try {
                        const url = await onUpload(file)
                        return url
                    } catch (err:any) {
                        uni.showToast({
                            title: err.message || err || '上传失败',
                            icon: 'none'
                        })
                        return ''
                    }
                }).filter((url) => url)

                emit('update:modelValue', [...props.modelValue, ...newUrls])
            })
    }
}


function onUpload(file:File) {
    if (props.handleUpload) { // 自定义上传

        return props.handleUpload(file)

    } else { // 默认上传

        return new Promise<string>((resolve, reject) => {
            if (!props.uploadUrl) {
                reject('请配置上传地址')
                return
            }

            uni.uploadFile({
                url: props.uploadUrl,
                fileType: 'image', // 在支付宝
                file: file,
                name: 'file',
                timeout: 10000,
            })
            .then((res) => {
                const data = JSON.parse(res.data)
                if (data.code === 0) {
                    resolve(data.data.url)
                } else {
                    reject(data.msg)
                }
            })
        })
    }

    
}
</script>


<style lang="scss">
@import './style.scss';
</style>