<template>
    <y-fullpage circular :currentItemId="currentItemId" @onChange="onSwiperChange">
        <y-fullpage-item item-id="index">
            <image style="width:100vw;" src="./img/back_1.jpg" mode="widthFix"></image>
        </y-fullpage-item>

        <y-fullpage-item item-id="2">
            <image style="width:100vw;" src="./img/back_2.jpg" mode="widthFix"></image>
        </y-fullpage-item>

        <y-fullpage-item item-id="3">
            <image style="width:100vw;" src="./img/back_3.jpg" mode="widthFix"></image>
        </y-fullpage-item>

        <y-fullpage-item item-id="4">
            <image style="width:100vw;" src="./img/back_4.jpg" mode="widthFix"></image>
        </y-fullpage-item>

        <y-fullpage-item item-id="5">
            <image style="width:100vw;" src="./img/back_5.jpg" mode="widthFix"></image>
        </y-fullpage-item>

        <y-fullpage-item item-id="6">
            <image style="width:100vw;" src="./img/back_6.jpg" mode="widthFix"></image>
        </y-fullpage-item>

        <y-fullpage-item item-id="7">
            <image style="width:100vw;" src="./img/back_7.jpg" mode="widthFix"></image>
        </y-fullpage-item>

        <y-fullpage-item item-id="8">
            <image style="width:100vw;" src="./img/back_8_1.jpg" mode="widthFix"></image>
        </y-fullpage-item>
    </y-fullpage>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentItemId = ref('index')

function onSwiperChange(currentItem: string) {
    currentItemId.value = currentItem
}
</script>
