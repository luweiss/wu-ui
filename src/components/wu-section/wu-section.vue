<script setup lang="ts">
import {useSlots, computed} from "vue";

/**
 * 一个简单的由标题和内容组成的组件
 * @example
 *   <wu-section title="标题">
 *       主要内容
 *   </wu-section>
 */

defineOptions({
    name: 'WuSection',
    options: {
        virtualHost: true,
    },
});

const slots = useSlots();
const props = withDefaults(defineProps<{
    /**
     * 标题
     */
    title?: string,

    /**
     * 底部内容
     */
    footer?: string,

    /**
     * 子项目间距
     * @example 20
     * @example '20rpx'
     */
    gap?: string | number,
}>(), {});

const contentStyle = computed(() => {
    const gap = isNaN(Number(props.gap)) ? `${props.gap}` : `${props.gap}px`;
    return {
        gap: gap ? gap : '',
    };
});
</script>

<template>
    <div class="section">
        <div class="title" v-if="slots['title'] || props.title">
            <!-- @slot 标题位置 -->
            <slot name="title" v-if="slots['title']"/>
            <template v-else>{{ props.title }}</template>
        </div>
        <div class="content" :style="contentStyle">
            <!-- @slot 内容位置 -->
            <slot/>
        </div>
        <div class="footer" v-if="slots['footer'] || props.footer">
            <!-- @slot 底部位置 -->
            <slot name="footer" v-if="slots['footer']"/>
            <template v-else>{{ props.footer }}</template>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../vars.scss";

.section {
    padding: vars.$wu-padding;
    display: flex;
    flex-direction: column;
    gap: calc(vars.$wu-margin / 2);

    .title {
        font-size: vars.$wu-font-size-lg;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: vars.$wu-margin;
    }
}
</style>