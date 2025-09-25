<script setup lang="ts">
import {
    useSlots,
    inject,
    computed,
    onMounted,
    ref,
    watch,
    getCurrentInstance,
} from 'vue';
import Wu from "../api";
import WuSwipe from "../wu-swipe/wu-swipe.vue";
import WuIcon from "../wu-icon/wu-icon.vue";

/**
 * 以列表的方式展示内容的组件，通常配合wu-cell-group使用
 *
 * @example
 * <!-- 基础 -->
 * <wu-cell-group>
 *     <wu-cell label="姓名">张三丰</wu-cell>
 *     <wu-cell label="年龄">100</wu-cell>
 * </wu-cell-group>
 *
 * @example
 * <!-- 图标: prefixIcon(左侧图标),suffixIcon(右侧图标),showArrow(箭头) -->
 * <wu-cell-group>
 *     <wu-cell label="标签" prefixIcon="love-filling">图标在左侧</wu-cell>
 *     <wu-cell label="标签" suffixIcon="love-filling">图标在右侧</wu-cell>
 *     <wu-cell label="标签" showArrow>箭头图标</wu-cell>
 * </wu-cell-group>
 *
 * @example
 * <!-- 链接: url(页面链接),urlParams(链接参数) -->
 * <wu-cell-group>
 *     <wu-cell label="标签" url=“/pages/index/index” :urlParams="{id: 1}">跳转到主页</wu-cell>
 * </wu-cell-group>
 *
 * @example
 * <!-- 左滑显示隐藏的内容 -->
 * <wu-cell-group>
 *     <wu-cell swipe-enabled>
 *         主要内容
 *         <template #hidden-content>隐藏的内容</template>
 *     </wu-cell>
 * </wu-cell-group>
 */

defineOptions({
    name: 'WuCell',
    options: {
        virtualHost: true,
    },
});

const instance = getCurrentInstance();
const emit = defineEmits<{
    /**
     * 点击事件
     */
    click: [e: Event]
}>();
const slots = useSlots();
const props = withDefaults(defineProps<{
    /**
     * 左侧图标，可选值同wu-icon.icon属性
     */
    prefixIcon?: string,

    /**
     * 左侧文本
     */
    label?: string,

    /**
     * 主要内容
     */
    content?: string,

    /**
     * 右侧图标，可选值同WuIcon.icon属性
     */
    suffixIcon?: string,

    /**
     * 是否显示向右箭头
     * @default false
     */
    showArrow?: boolean,

    /**
     * 点击跳转的链接
     * @example /pages/xxx
     */
    url?: string,

    /**
     * 跳转的链接参数
     * @example {id: 1}
     */
    urlParams?: any,

    /**
     * 点击反馈效果
     * @default true
     */
    feedback?: boolean,

    /**
     * 是否显示错误信息
     * @default false
     */
    error?: boolean,

    /**
     * 错误信息
     */
    errorMessage?: string,

    /**
     * 是否开启左滑显示隐藏内容
     * @default false
     */
    swipeEnabled?: boolean,

    /**
     * 左滑显示宽度，单位rpx，或百分比
     * @example - 300
     * @example - '30%'
     */
    swipeWidth?: string | number,

    /**
     * 是否自动关闭左滑
     * @default true
     */
    autoCloseSwipe?: boolean,

    /**
     * 左滑动画时间，单位ms
     * @default 300
     */
    swipeDuration?: number,
}>(), {
    feedback: true,
    autoCloseSwipe: true,
    swipeDuration: 300,
});

const swipeState = ref(false);
const labelWidth = inject('labelWidth', false);
const cells = inject('cells', ref([]));

const index = ref(-1);

// 计算是否为第一个或最后一个元素
const isFirst = computed(() => index.value === 0)
const isLast = computed(() => index.value === cells.value.length - 1)

onMounted(() => {
    // 注册自身到cellGroup
    if (instance !== null) {
        inject('registerCell', (instance: any) => {
        })(instance);
        // 更新索引
        index.value = cells.value.length - 1;
    }
})


const labelStyle = computed(() => {
    const style: Record<any, any> = {};
    if (labelWidth) {
        style.width = labelWidth;
    }
    return style;
});

const cellClass = computed(() => {
    const classes: string[] = [];
    if (isFirst.value) {
        classes.push('first-child');
    }
    if (isLast.value) {
        classes.push('last-child');
    }
    if (props.feedback && !swipeState.value) {
        classes.push('feedback');
    }
    if (props.error) {
        classes.push('error');
    }
    return classes;
});

function onClick($event: any) {
    setTouchingCellIndex(index.value);
    emit('click', $event);
    if (props.url) {
        Wu.router.push(props.url);
    }
}

const setTouchingCellIndex = inject('setTouchingCellIndex', (i: number) => {
});

watch(() => swipeState.value, (val) => {
    if (val) {
        setTouchingCellIndex(index.value);
    }
});

const onTouchStart = (e: any) => {
    setTouchingCellIndex(index.value);
};

const touchingCellIndex = inject('touchingCellIndex', ref(null));

watch(() => touchingCellIndex.value, (i) => {
    if (i !== index.value) {
        swipeState.value = false;
    }
});

const onHiddenContentClick = () => {
    if (props.autoCloseSwipe) {
        setTimeout(() => {
            swipeState.value = false;
        }, 50);
    }
};

defineExpose({
    /**
     * 当前cell所在的cell-group的索引位置
     */
    index,
    /**
     * 左滑组件的状态
     */
    swipeState,
});
</script>

<template>
    <div class="cell" :class="cellClass" @tap="onClick($event)" @touchstart="onTouchStart">
        <wu-swipe :disabled="!swipeEnabled"
                  v-model="swipeState"
                  :duration="props.swipeDuration"
                  :hidden-width="props.swipeWidth">
            <template #hidden-content style="height: 100%">
                <div class="hidden-content" @click="onHiddenContentClick">
                    <!-- @slot 隐藏的内容，左滑时显示 -->
                    <slot name="hidden-content"/>
                </div>
            </template>
            <div class="header" v-if="slots['header']">
                <!-- @slot cell的上面部分 -->
                <slot name="header"/>
            </div>
            <div class="body">
                <div class="prefix-icon" v-if="prefixIcon || slots['prefixIcon']">
                    <!-- @slot 左侧图标 -->
                    <slot v-if="slots['prefixIcon']" name="prefixIcon"/>
                    <wu-icon v-else :icon="prefixIcon"></wu-icon>
                </div>
                <div class="label" :style="labelStyle" v-if="label || slots['label']">
                    <!-- @slot label位置 -->
                    <slot v-if="slots['label']" name="label">
                    </slot>
                    <text v-else class="label-text">{{ label }}</text>
                </div>
                <div class="content">
                    <!-- @slot 主要内容 -->
                    <slot/>
                </div>
                <div class="suffix-icon" v-if="showArrow">
                    <wu-icon icon="arrow-right" type="light"></wu-icon>
                </div>
                <div class="suffix-icon" v-else-if="suffixIcon || slots['suffixIcon']">
                    <!-- @slot 右侧图标 -->
                    <slot v-if="slots['suffixIcon']" name="suffixIcon"/>
                    <wu-icon v-else :icon="suffixIcon"></wu-icon>
                </div>
            </div>
            <div class="footer" v-if="slots['footer']">
                <!-- @slot cell的下面部分 -->
                <slot name="footer"/>
            </div>
            <div v-if="props.errorMessage" class="error-message">{{ props.errorMessage }}</div>
        </wu-swipe>
    </div>
</template>

<style scoped lang="scss">
@use "../vars.scss";

$cell-height: vars.$wu-cell-height;
.cell.feedback::before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .1);
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    transition: opacity 100ms;
}

.cell.feedback:active::before {
    visibility: visible;
    opacity: 1;
}

.cell::after {
    content: " ";
    position: absolute;
    left: vars.$wu-padding;
    right: 0;
    bottom: 0;
    height: 0;
    border-bottom: 1rpx solid vars.$wu-border-color;
    z-index: 2;
}

.cell.last-child::after {
    display: none;
}

.cell {
    position: relative;
    font-size: vars.$wu-font-size-base;

    .hidden-content {
        width: 100%;
        height: 100%;
    }

    .header {
        padding: vars.$wu-padding vars.$wu-padding 0 vars.$wu-padding;
    }

    .footer {
        padding: 0 vars.$wu-padding vars.$wu-padding vars.$wu-padding;
    }

    .body {
        display: flex;
        justify-content: space-between;
        gap: vars.$wu-padding;
        padding: 0 vars.$wu-padding;

        .prefix-icon {
            width: auto;
            min-height: $cell-height;
            display: flex;
            align-items: center;
        }

        .label {
            width: auto;
            min-height: $cell-height;
            display: flex;
            align-items: center;
        }

        .content {
            flex: 1;
            width: auto;
            min-height: $cell-height;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            word-wrap: break-word; /* 旧属性，兼容老浏览器 */
            word-break: break-word; /* 自动拆分单词换行 */
            white-space: normal; /* 默认值，允许换行 */
        }

        .suffix-icon {
            width: auto;
            min-height: $cell-height;
            display: flex;
            align-items: center;
        }
    }

    .error-message {
        padding: 0 vars.$wu-padding;
        color: vars.$wu-color-danger;
        font-size: vars.$wu-font-size-sm;
    }
}

.error {
    .label {
        color: vars.$wu-color-danger;
    }
}
</style>