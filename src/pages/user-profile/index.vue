<template>
    <view>来个演示</view>
    <button @tap="userProfileRef.open()">弹出授权</button>

    <y-user-profile ref="userProfileRef" v-model="data" :show-close="true" :mask-closable="false" theme-color="#456dea"
        :handle-upload="handleUploadAvatar" @submit="handleSubmit" :default-avatar="defaultAvatar" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import defaultAvatar from './assets/default-avatar.png';

const userProfileRef = ref()

const data = ref({
    nickname: '',
    avatar: ''
})


async function handleUploadAvatar(tmpPath: string) {
    // TODO 处理上传逻辑
    // const url = await apiUpload(tmpPath);
    const url = ''
    return url;
}

function handleSubmit(data: any) {
    // TODO 处理提交逻辑
    userProfileRef.value.close() // 关闭
}
</script>