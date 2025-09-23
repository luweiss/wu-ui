<script setup lang="ts">
import {ref} from "vue";

const state1 = ref(false);
const state2 = ref(false);
const onClick = () => {
    uni.showToast({
        title: "点击了更多",
        icon: "none",
    });
    state1.value = !state1.value;
};
</script>

<template>
    <div style="background: #ededed; min-height: 100vh">
        <wu-section>
            <wu-swipe v-model="state1">
                <div class="item-content">主要内容(尝试向左滑动)</div>
                <template #hidden-content>
                    <div class="hidden-content">
                        <button @click="onClick"
                                style="display: block; width: 100%; height: 100%; box-sizing: border-box">更多
                        </button>
                    </div>
                </template>
            </wu-swipe>
            <wu-swipe v-model="state2" hidden-width="50%">
                <div class="item-content">通过hidden-width="50%"设置隐藏内容的长度</div>
                <template #hidden-content>
                    <div class="hidden-content">
                        隐藏的内容
                    </div>
                </template>
            </wu-swipe>

            <wu-cell-group title="在wu-cell-group中使用, wu-cell.swipe-enabled: true" radius>
                <wu-cell swipe-enabled label="cell1">
                    <template #hidden-content>
                        隐藏的内容1
                    </template>
                </wu-cell>
                <wu-cell swipe-enabled label="cell2">
                    <template #hidden-content>
                        隐藏的内容2
                    </template>
                </wu-cell>
            </wu-cell-group>
        </wu-section>
    </div>
</template>

<style scoped lang="scss">
.item-content {
    background: #fff;
    height: 100rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    border-radius: 30rpx;
}

.hidden-content {
    background: rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    height: 100%;
    border-radius: 30rpx;
    overflow: hidden;
    padding: 20rpx 0;
    box-sizing: border-box;
}
</style>