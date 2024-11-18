<template>
    <swiper-item ref="itemRef" class="y-fullpage-item" :item-id="props.itemId">
        <scroll-view class="y-fullpage-item__scrollview" :scroll-y="allowScroll" :lower-threshold="10"
            @scrolltolower="onEnd" @scroll="onScroll">
            <slot></slot>
        </scroll-view>
    </swiper-item>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
const allowScroll = ref(true)
const itemRef = ref()


interface Props {
    itemId: string
}
const props = withDefaults(defineProps<Props>(), {
    itemId: ''
})



function onEnd() {
    allowScroll.value = false

    setTimeout(() => {
        allowScroll.value = true
    }, 1000);
}

function onScroll(e) {
    console.log(e.detail.scrollTop,'e.detail.scrollTop', props.itemId)
    if (e.detail.scrollTop < 0) {
        allowScroll.value = false
    }
}

</script>
<style lang="scss">
.y-fullpage-item {
    height: 100vh;

    &__scrollview {
        width: 100vw;
        height: 100vh;
    }

}
</style>
