<script setup lang="ts">
import WuButton from "../wu-button/wu-button.vue";
import WuInput from "../wu-input/wu-input.vue";

/**
 * 数字输入框
 * @example
 * <script setup>
 *     import {ref} from 'vue';
 *     const val = ref(0)
 * </script\>
 * <template>
 *   <wu-input-number v-model="val"/>
 * </template>
 */

defineOptions({
    name: 'WuInputNumber',
    options: {
        virtualHost: true,
    },
});

const model = defineModel<any>();
const props = withDefaults(defineProps<{
    /**
     * 是否禁用
     */
    disabled?: boolean,

    /**
     * 步长
     * @default 1
     */
    step?: number,

    /**
     * 允许的最小值
     */
    min?: number | boolean,

    /**
     * 允许的最大值
     */
    max?: number | boolean,

    /**
     * 按钮大小
     * @default 'base'
     */
    size?: "sm" | "base" | "lg",

    /**
     * 按钮颜色类型，默认是白色按钮
     */
    type?: "default" | "primary" | "info" | "warning" | "danger",
}>(), {
    step: 1,
    size: "base",
    type: "info",
})

const onSub = () => {
    if (typeof props.min === 'number' && (model.value - props.step) < props.min) {
        return;
    }
    model.value = model.value - props.step;
};
const onAdd = () => {
    if (typeof props.max === 'number' && (model.value + props.step) > props.max) {
        return;
    }
    model.value = model.value + props.step;
};

const checkLimit = () => {
    if (typeof props.max === 'number' && model.value > props.max) {
        model.value = props.max;
    }
    if (typeof props.min === 'number' && model.value < props.min) {
        model.value = props.min;
    }
};
</script>

<template>
    <div class="input-number">
        <wu-button :disabled="props.disabled"
                   class="btn"
                   weight="bold"
                   :type="props.type"
                   :size="props.size"
                   weak @click="onSub()">-
        </wu-button>
        <wu-input :disabled="props.disabled"
                  class="input"
                  v-model.number="model"
                  type="number"
                  @blur="checkLimit"
                  @confirm="checkLimit"
                  align="center"/>
        <wu-button :disabled="props.disabled"
                   class="btn"
                   weight="bold"
                   :type="props.type"
                   :size="props.size"
                   weak @click="onAdd()">+
        </wu-button>
    </div>
</template>

<style scoped lang="scss">
@use "../vars.scss";

.input-number {
    display: flex;
    align-items: center;
    width: 100%;
    gap: calc(vars.$wu-margin / 2);

    .btn {
        width: 80rpx;
    }

    .input {
        flex: 1;
    }
}
</style>