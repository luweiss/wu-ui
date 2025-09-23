<script setup lang="ts">
/**
 * This is an example of creating a reusable grid component and using it with external data.
 * @example -1
 * // 示例1
 *   <wu-test
 *     :type="loading"
 *     :state="open"
 *   >content</wu-test>
 *
 * @example -2
 * // 示例2
 *   <wu-test
 *     :type="loading"
 *     :state="open"
 *   >content2</wu-test>
 */

defineOptions({
    name: 'WuTest',
    options: {
        virtualHost: true,
    },
});

const props = defineProps<{
    /**
     * 类型
     */
    type?: string,
    /**
     * 状态
     */
    state?: 'open' | 'close' | string
}>();

defineExpose({
    /**
     * 是否打开了
     * @type function
     */
    getIsOpened: (a: boolean): boolean => {
        return props.state === 'open';
    },
    state: props.state
});
</script>

<template>
    <div>
        <div>test</div>
        <div>type: {{ props.type }}</div>
        <div>state: {{ props.state }}</div>
        <div>
            <!-- @slot 头部插槽 -->
            <slot name="header"/>
            <!-- @slot 默认的 -->
            <slot/>
            <!-- @slot 脚部插槽 -->
            <slot name="footer"/>
        </div>
    </div>
</template>

<style scoped>

</style>