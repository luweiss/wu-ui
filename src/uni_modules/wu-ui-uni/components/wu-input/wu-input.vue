<script setup lang="ts">
import {computed, ref, watch} from "vue";
import WuIcon from "../wu-icon/wu-icon.vue";

/**
 * 输入框
 * @example
 * <script setup>
 *     import {ref} from 'vue';
 *     const msg = ref("hello")
 * </script\>
 * <template>
 *   <wu-input v-model="msg"/>
 * </template>
 */

defineOptions({
    name: 'WuInput',
    options: {
        virtualHost: true,
    },
});

const model = defineModel<string | any>();
const props = withDefaults(defineProps<{
    /**
     * 使用带边框的输入框(默认是透明的)
     * @default false
     */
    withBorder?: boolean,

    /**
     * 禁用状态
     */
    disabled?: boolean,

    /**
     * 是否是密码输入框
     */
    password?: boolean,

    /**
     * 最大长度
     */
    maxlength?: number,

    /**
     * 提示内容
     */
    placeholder?: string,

    /**
     * 是否获取焦点
     */
    focus?: boolean,

    /**
     * 可一键清除
     */
    clearable?: boolean,

    /**
     * 文本对齐方式
     * @default 'left'
     */
    align?: "left" | "center" | "right",

    /**
     * 输入类型
     * @link https://uniapp.dcloud.net.cn/component/input.html#type
     */
    type?: 'text' | 'number' | 'idcard' | 'digit' | 'tel' | 'safe-password' | 'nickname' | string,

    /**
     * 弹出软键盘的右下角按钮的文字。
     * @link https://uniapp.dcloud.net.cn/component/input.html#confirm-type
     */
    confirmType?: 'send' | 'search' | 'next' | 'go' | 'done' | string,

    /**
     * 输入框大小
     * @default 'base'
     */
    size?: "sm" | "base" | "lg",
}>(), {
    maxlength: -1,
    align: "left",
    size: "base",
});

const emit = defineEmits<{
    /**
     * 当键盘输入时，触发input事件，event.detail = {value}
     * @param event {Event} 触发事件
     */
    input: [event: Event],
    /**
     * 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
     * @param event {Event} 触发事件
     */
    focus: [event: Event],
    /**
     * 输入框失去焦点时触发，event.detail = {value: value}
     * @param event {Event} 触发事件
     */
    blur: [event: Event],
    /**
     * 点击完成按钮时触发，event.detail = {value: value}
     * @param event {Event} 触发事件
     */
    confirm: [event: Event],
    /**
     * 键盘高度发生变化的时候触发此事件，event.detail = {height: height, duration: duration}
     * @param event {Event} 触发事件
     */
    keyboardheightchange: [event: Event],
}>();
const focusState = ref(false);

const classes = computed(() => {
    const classes: string[] = [];
    if (props.withBorder) {
        classes.push('with-border');
    }
    if (props.align) {
        classes.push('align-' + props.align);
    }
    if (props.size) {
        classes.push('size-' + props.size);
    }
    if (props.clearable && props.align === 'center') {
        classes.push('add-clear-padding-left');
    }
    return classes;
});

const styles = computed(() => {
    const styles: Record<any, any> = {};
    return styles;
});

const myFocus = ref(props.focus);

watch(() => props.focus, (newValue) => {
    myFocus.value = newValue;
});

function onClear() {
    model.value = '';
    myFocus.value = true;
}

const showClearable = computed(() => {
    if (!props.clearable) {
        return false;
    }
    return model.value.length > 0 && focusState.value;
});

const clearClass = computed(() => {
    return [showClearable.value ? 'clear-visible' : ''];
})

const onFocus = ($event: Event) => {
    focusState.value = true;
    emit('focus', $event);
}
const onBlur = ($event: Event) => {
    setTimeout(() => {
        focusState.value = false;
    }, 300);
    emit('blur', $event);
}
</script>

<template>
    <div class="input-wrapper"
         :class="classes"
         :style="styles" @tap="myFocus=true">
        <input class="input"
               v-model="model"
               :type="props.type"
               :confirm-type="props.confirmType"
               :focus="myFocus"
               :maxlength="maxlength"
               :password="props.password"
               :disabled="props.disabled"
               :placeholder="placeholder"
               @input="emit('input', $event)"
               @focus="onFocus($event)"
               @blur="onBlur($event)"
               @confirm="emit('confirm', $event)"
               @keyboardheightchange="emit('keyboardheightchange', $event)"
        />
        <div v-if="props.clearable" class="clear" :class="clearClass" @click="onClear">
            <wu-icon icon="add" :customStyle="{color: '#fff', transform: 'rotate(45deg)'}"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../vars.scss";
@use "sass:color";

:host {
    width: 100%;
}

.input-wrapper {
    display: flex;
    align-items: center;
    background: transparent;
    width: 100%;
    height: vars.$wu-button-size-base;
    font-size: vars.$wu-font-size-base;
    gap: calc(vars.$wu-button-size-base / 5);
}

.input {
    flex: 1;
    height: 100%;
    width: auto;
    border-radius: 0;
    background: transparent;
    font-size: inherit;

    .input-placeholder {
        color: rgba(vars.$wu-text-color-light, .5);
        font-size: inherit;
        font-weight: inherit;
        font-family: inherit;
    }
}

.input-wrapper.size-sm {
    height: vars.$wu-button-size-sm;
    font-size: vars.$wu-font-size-sm;
    gap: calc(vars.$wu-button-size-base / 8);

    .iconfont {
        font-size: vars.$wu-font-size-sm;
    }
}

.input-wrapper.with-border.size-sm {
    border-radius: calc(vars.$wu-border-radius / 2);
}

.align-left {
    .input {
        text-align: left;
    }
}

.align-center {
    .input {
        text-align: center;
    }
}

.align-right {
    .input {
        text-align: right;
    }
}

$suffixIconSize: calc(vars.$wu-button-size-base / 2);
$suffixIconSizeSm: calc(vars.$wu-button-size-base / 2.5);
.clear {
    display: flex;
    align-items: center;
    justify-content: center;
    background: vars.$wu-text-color-light;
    border-radius: $suffixIconSize;
    width: $suffixIconSize;
    height: $suffixIconSize;
    visibility: hidden;
}

.size-sm {
    .clear {
        width: $suffixIconSizeSm;
        height: $suffixIconSizeSm;
    }
}

.clear.clear-visible {
    visibility: visible;
}

.clear:active {
    background: color.adjust(vars.$wu-text-color-light, $lightness: -10%);
}

.input-wrapper.add-clear-padding-left {
    padding-left: calc(vars.$wu-button-size-base / 2 + vars.$wu-button-size-base / 5);
}

.input-wrapper.with-border.add-clear-padding-left {
    padding-left: calc(vars.$wu-padding + vars.$wu-button-size-base / 2 + vars.$wu-button-size-base / 5);
}

.input-wrapper.with-border {
    border: 1px solid vars.$wu-border-color;
    background: #fff;
    border-radius: vars.$wu-border-radius;
    padding: 0 vars.$wu-padding;
}
</style>