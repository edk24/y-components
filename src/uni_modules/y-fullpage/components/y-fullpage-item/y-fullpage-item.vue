<template>
    <swiper-item ref="itemRef" class="y-fullpage-item" :item-id="props.itemId">
        <scroll-view class="y-fullpage-item__content" :scroll-y="!scrollEnd" :lower-threshold="1"
            scroll-with-animation :scroll-top="currentScrollTop" @scrolltolower="onScrollBottom" @scroll="onScroll">
            <slot></slot>
        </scroll-view>
    </swiper-item>
</template>
<script lang="ts" setup>
import {  ref } from 'vue';
const scrollEnd = ref(false)
const currentScrollTop = ref(0)
const itemRef = ref()

interface Props {
    itemId: string
}
const props = withDefaults(defineProps<Props>(), {
    itemId: ''
})


function onScroll(e: any) {
    const {
        scrollTop
    } = e.detail


    if (scrollEnd.value) {
        if (currentScrollTop.value > scrollTop) { // 滚动到上面
            scrollEnd.value = false;
        }
    } 
    currentScrollTop.value = scrollTop
}

function getSwiper() {
    return itemRef.value?.$parent.$parent
}

function getAllElementItemId() {
    const swiper = getSwiper()
    const items = swiper.$el.querySelectorAll('.y-fullpage-item')

    let ids = []
    for (let i = 0; i < items.length; i++) {
       ids.push(items[i].__vueParentComponent?.props.itemId)
    }
    return ids
}

function navigateNext() {
    const swiper = getSwiper()
    const ids = getAllElementItemId()
    const index = ids.indexOf(props.itemId)


    if (index < ids.length - 1) {
        console.log(ids[index + 1])
        console.log(swiper)
        // swiper.$emit('update:currentItemId', ids[index + 1])
        swiper.$emit('change', {
            detail: {
                currentItemId: ids[index + 1]
            }
        })

    }
}




// 滚动到底部
// 设置scrollEnd为true，不允许 scroll-view 滚动，让给 swiper 滚动
// 1.2s 后，scrollEnd 为 false，允许 scroll-view 滚动。以及还原当前页的 scrollTop 到顶部
function onScrollBottom() {
    // navigateNext() 

    scrollEnd.value = true

    setTimeout(() => {
        scrollEnd.value = false
        const swiper = itemRef.value?.$parent?.$parent
        const itemid = props.itemId
        if (itemid != swiper.currentItemId) {
            currentScrollTop.value = 0
        }
    }, 1200);
}

</script>
<style lang="scss">
.y-fullpage-item {
    height: 100vh;

    &__content {
        width: 100vw;
        height: 100vh;
    }

}
</style>
