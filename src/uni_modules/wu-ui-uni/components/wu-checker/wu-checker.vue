<script setup lang="ts">
import {ref, computed} from 'vue';
import WuIcon from "../wu-icon/wu-icon.vue";

/**
 * 单选、多选、开关
 * @example
 *   <!-- 默认多选样式 -->
 *   <wu-checker v-model="true"/>
 *
 * @example
 *   <!-- 单选样式 -->
 *   <wu-checker v-model="true" circle/>
 *
 * @example
 *   <!-- 开关样式 -->
 *   <wu-checker v-model="true" switch/>
 */

defineOptions({
    name: 'WuChecker',
    options: {
        virtualHost: true,
    },
});

const model = defineModel();
const emit = defineEmits<{
    /**
     * 状态发生改变时
     * @param value {any} 改变后的值
     */
    change: [value: any]
}>();
const props = withDefaults(defineProps<{
    /**
     * 是否禁用
     */
    disabled?: boolean;

    /**
     * 激活状态的值
     * @default true
     */
    trueValue?: any;

    /**
     * 非激活状态的值
     * @default false
     */
    falseValue?: any;

    /**
     * 圆形样式(radio样式)
     */
    circle?: boolean;

    /**
     * 开关样式
     */
    switch?: boolean;
}>(), {
    trueValue: true,
    falseValue: false,
});

const checkerClass = computed(() => {
    return {
        'checked': model.value === props.trueValue,
        'circle': props.circle,
        'switch': props.switch,
        'disabled': props.disabled,
    }
});

const onClick = () => {
    if (props.disabled) return;
    model.value = model.value === props.trueValue ? props.falseValue : props.trueValue;
    emit('change', model.value);
};

</script>

<template>
    <div class="checker" :class="checkerClass" @click="onClick">
        <div v-if="props.switch" class="switch-circle"></div>
        <wu-icon v-else class="icon" icon="select" weight="bolder" color="#ffffff"/>
    </div>
</template>

<style scoped lang="scss">
@use "../vars.scss";

$size: calc(vars.$wu-font-size-base * 1.5);
$switchWidth: calc($size * 1.6);
$radius: calc(vars.$wu-border-radius / 2);
.checker {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: $size;
    height: $size;
    overflow: hidden;
    background: #fff;
    border-radius: $radius;
    vertical-align: bottom;
    border: 1px solid vars.$wu-border-color;;

    .icon {
        visibility: hidden;
    }
}

.disabled {
    background: vars.$wu-background-light;
    opacity: 65%;
}

.circle {
    border-radius: $size;
}

.checked {
    background: vars.$wu-color-primary;
    border-color: vars.$wu-color-primary;

    .icon {
        visibility: visible;
    }
}


.switch {
    border-radius: $size;
    width: $switchWidth;
    background: vars.$wu-background-light;
    border-color: vars.$wu-border-color;
    position: relative;
    z-index: 1;
    transition: 250ms ease-in-out;
    //box-shadow: inset 0 0 calc($size / 4) rgba(0, 0, 0, 0.1);

    .switch-circle {
        width: calc($size - 2px);
        height: calc($size - 2px);
        border-radius: $size;
        background: #fff;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        box-shadow: 0 0 calc($size / 4) rgba(0, 0, 0, 0.05);
        transition: 250ms ease-in-out;
    }
}

.switch.disabled {
    box-shadow: none;

    .switch-circle {
        box-shadow: none;
    }
}

.switch.checked {
    background: vars.$wu-color-primary;
    border-color: vars.$wu-color-primary;

    .switch-circle {
        left: calc($switchWidth - $size);
    }
}
</style>