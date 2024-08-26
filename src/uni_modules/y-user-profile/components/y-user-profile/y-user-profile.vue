<script lang="ts" setup>
import { computed, ref } from 'vue';

const userProfileRef = ref()

interface Data {
    nickname: string;
    avatar: string;
}

interface Props {
    modelValue: Data,
    /** 基础域名 （小程序、app相对路径时可用） */
    domain?: string;
    /** 处理上传 */
    handleUpload?: (tmpPath: string) => Promise<string>;
    /** 高度 */
    height?: number;
    /** 主题色 */
    themeColor?: string;
    /** 显示关闭按钮 */
    showClose?: boolean,
    /** 点击遮罩关闭 */
    maskClosable?: boolean,
    /** 默认头像 */
    defaultAvatar?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: { nickname: '', avatar: '' },
    domain: '',
    handleUpload: (tmpPath: string) => tmpPath,
    showClose: true,
    maskClosable: false,
    height: 800,
    themeColor: '#1989fa',
    defaultAvatar: ''
});
const emit = defineEmits(['update:modelValue', 'submit']);

const allowSubmit = computed((): boolean => {
    return props.modelValue.nickname == '' && props.modelValue.avatar == ''
});

const style = computed(() => {
    return {
        '--theme-color': props.themeColor
    }
});



// 处理头像上传
async function handleUploadAvatar(e: any) {
    const avatarPath = e.detail.avatarUrl
    const url = props.handleUpload ? await props.handleUpload(avatarPath) : avatarPath;

    emit('update:modelValue', {
        ...props.modelValue,
        avatar: url
    });
}

// 选择头像
function handleChooseAvatar() {
    // #ifdef MP-WEIXIN
    // 微信小程序，自动获取头像.
    return;
    // #endif

    uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
    })
        .then((res) => {
            const tempFilePath = res.tempFilePaths[0];
            handleUploadAvatar({
                detail: {
                    avatarUrl: tempFilePath
                }
            });
        })
}

// 提交
function handleSubmit() {
    emit('submit', props.modelValue);
}

function handleNicknameChange(e: any) {
    emit('update:modelValue', {
        ...props.modelValue,
        nickname: e.detail.value
    });
}


const open = () => {
    userProfileRef.value.open();
};

const close = () => {
    userProfileRef.value.close();
};

defineExpose({
    open,
    close
});
</script>

<template>
    <y-drawer ref="userProfileRef" :show-close="showClose" close-icon="close" :mask-closable="maskClosable"
        :length="height">
        <view class="y-user-profile" :style="style">
            <view class="y-user-profile__head">
                <view class="y-user-profile__head-title">
                    <slot name="title">获取您的昵称、头像</slot>
                </view>
                <view class="y-user-profile__head-desc">
                    <slot name="desc">获取用户头像、昵称，主要用于向用户提供具有辨识度的用户体验</slot>
                </view>
            </view>

            <view class="y-user-profile__body">
                <button class="y-btn-empty" open-type="chooseAvatar" @chooseavatar="handleUploadAvatar"
                    @tap="handleChooseAvatar">
                    <view class="y-user-profile__body-avatar">
                        <image v-if="modelValue.avatar" :src="domain + modelValue.avatar" mode="scaleToFill" />
                        <image v-else :src="defaultAvatar" mode="scaleToFill" />
                        <view class="icon">
                            <uni-icons type="camera-filled" color="#fff" size="16" />
                        </view>
                    </view>
                </button>

                <view>
                    <!-- #ifdef MP-WEIXIN -->
                    <!-- 微信小程序，type=nickname 自动获取昵称 -->
                    <input class="y-user-profile__body-input" type="nickname" :value="modelValue.nickname"
                        @input="handleNicknameChange" @change="handleNicknameChange" :maxlength="20" placeholder="请输入昵称"
                        placeholder-class="y-input-placeholder" />
                    <!-- #endif -->

                    <!-- #ifndef MP-WEIXIN -->
                    <!-- 非微信小程序，手动填写 -->
                    <input class="y-user-profile__body-input" :value="modelValue.nickname" @input="handleNicknameChange"
                        type="text" :maxlength="20" placeholder="请输入昵称" placeholder-class="y-input-placeholder" />
                    <!-- #endif -->
                </view>

                <view>
                    <button class="y-submit" type="button" :disabled="allowSubmit" @tap="handleSubmit">保存</button>
                </view>
            </view>
        </view>
    </y-drawer>
</template>

<style lang="scss">
@import './y-user-profile.scss';
</style>
