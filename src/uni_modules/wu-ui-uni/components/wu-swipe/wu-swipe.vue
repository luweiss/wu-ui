<script>
/**
 * 可以左滑显示隐藏内容的组件
 * @example
 * <script setup>
 *     import {ref} from 'vue';
 *     const state = ref(false)
 * </script\>
 * <template>
 *   <div>
 *       <wu-swipe v-model="state">
 *           <div>主要内容</div>
 *           <template #hidden-content>隐藏的内容</template>
 *       </wu-swipe>
 *   </div>
 * </template>
 */
export default {
    options: {
        virtualHost: true
    },
    emits: ['update:modelValue'],
    props: {
        modelValue: null,

        /**
         * 隐藏内容宽度
         * @default '30%'
         */
        hiddenWidth: {
            type: [String, Number],
            default: '30%',
        },

        /**
         * 是否禁用
         * @default false
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * 动画的时间,单位ms
         * @default 300
         */
        duration: {
            type: Number,
            default: 300,
        },
    },
    data() {
        return {
            swipeWidth: 0,
            value: this.modelValue !== undefined ? this.modelValue : false,
        };
    },
    computed: {
        finalHiddenWidth() {
            const max = this.swipeWidth / 2;
            let width;
            if (isNaN(this.hiddenWidth)
                && this.hiddenWidth.indexOf('%') === this.hiddenWidth.length - 1
            ) { // 百分比
                width = Math.min(this.swipeWidth * (parseFloat(this.hiddenWidth) / 100), max);
            } else { // 数字
                width = Math.min(this.hiddenWidth, max);
            }
            return width;
        },
    },
    mounted() {
        this.getSwipeWidth().then(e => {
            this.swipeWidth = e;
        });
    },
    watch: {
        modelValue(newVal, oldVal) {
            if (this.value !== newVal)
                this.value = newVal;
        },
    },
    methods: {
        getSwipeWidth() {
            return new Promise((resolve) => {
                uni.createSelectorQuery()
                    .in(this)
                    .select(".swipe")
                    .boundingClientRect((container) => {
                        if (Array.isArray(container))
                            container = container[0];
                        resolve(container.width);
                    }).exec();
            });
        },
        show() {
            this.$emit('update:modelValue', true);
            this.value = true;
        },
        hide() {
            this.$emit('update:modelValue', false);
            this.value = false;
        },
        updateShownState(e) {
            this.$emit('update:modelValue', e.isShown);
            this.value = e.isShown;
        },
    },
}

</script>

<!-- #ifdef MP-WEIXIN -->
<script module="wxs" lang="wxs" src="./swipe.wxs"></script>
<!-- #endif -->

<template>
    <!-- #ifdef MP-WEIXIN -->
    <div class="swipe"
         @touchstart="wxs.onTouchStart"
         @touchmove="wxs.onTouchMove"
         @touchend="wxs.onTouchEnd"
         :data-duration="duration"
         :data-max-move-value="finalHiddenWidth"
         :data-disabled="disabled"
         :shownState="value"
         :change:shownState="wxs.shownChange"
    >
        <div class="content" @click="hide">
            <!-- @slot 主要内容 -->
            <slot/>
        </div>
        <div class="hidden-content">
            <!-- @slot 隐藏的内容 -->
            <slot name="hidden-content"/>
        </div>
    </div>
    <!-- #else -->
    <view class="swipe"
          @touchstart="render.onTouchStart"
          @touchmove="render.onTouchMove"
          @touchend="render.onTouchEnd"
          :data-duration="duration"
          :data-max-move-value="finalHiddenWidth"
          :data-disabled="disabled"
          :shownState="value"
          :change:shownState="render.shownChange"
    >
        <view class="content" @click="hide">
            <!-- @slot 主要内容 -->
            <slot/>
        </view>
        <view class="hidden-content">
            <!-- @slot 隐藏的内容 -->
            <slot name="hidden-content"/>
        </view>
    </view>
    <!-- #endif -->
</template>
<script module="render" lang="renderjs">
import swipe from './swipe';

export default {
    methods: {
        shownChange(newValue, oldValue, ownerInstance, instance) {
            return swipe.shownChange(newValue, oldValue, this, instance);
        },
        onTouchStart(e, ownerInstance){
            return swipe.onTouchStart(e, this);
        },
        onTouchMove(e, ownerInstance) {
            return swipe.onTouchMove(e, this);
        },
        onTouchEnd(e, ownerInstance) {
            return swipe.onTouchEnd(e, this);
        },
    }
}
</script>

<style scoped lang="scss">
.swipe {
    position: relative;

    .hidden-content {
        position: absolute;
        left: 100%;
        top: 0;
        bottom: 0;
        width: 0;
    }
}
</style>