<script setup lang="ts">
import {provide, useSlots, ref, nextTick, onUnmounted, computed} from 'vue';

/**
 * 配合wu-cell使用
 * @example
 *   <wu-cell-group>
 *       <wu-cell label="姓名">张三丰</wu-cell>
 *       <wu-cell label="年龄">100</wu-cell>
 *   </wu-cell-group>
 */

defineOptions({
    name: 'WuCellGroup',
    options: {
        virtualHost: true,
    },
});

const emit = defineEmits<{
    /**
     * 点击事件
     */
    click: [e: Event]
}>();
const slots = useSlots();
const props = withDefaults(defineProps<{
    /**
     * 标题
     */
    title?: string;

    /**
     * 标题右侧内容
     */
    titleSuffix?: string;

    /**
     * 所有子组件wu-cell.label的宽度
     * @example 300rpx
     */
    labelWidth?: string;

    /**
     * 内容部分显示圆角边框
     * @default false
     */
    radius?: boolean;

    /**
     * 底部内容
     */
    footer?: string;

    /**
     * 内容背景颜色
     * @default '#ffffff'
     * @example '#ffffff'
     * @example 'transparent'
     */
    background?: string;

    /**
     * 内容部分使用内边距
     * @default false
     */
    usePadding?: boolean;
}>(), {});


// 存储所有cell的引用
const cells = ref<any[]>([]);
const touchingCellIndex = ref(-1);

// 提供labelWidth和cells信息
provide('labelWidth', props.labelWidth)
provide('cells', cells)
provide('touchingCellIndex', touchingCellIndex)


// 注册Cell的方法
const registerCell = (cell: any | null) => {
    if (cell !== null)
        cells.value.push(cell)
    // 更新所有Cell的索引
    nextTick(() => {
        updateCellIndices()
    })
}

// 设置当前打开swipe的cell index
const setTouchingCellIndex = (i: number) => {
    touchingCellIndex.value = i
}

// 提供注册方法
provide('registerCell', registerCell)
provide('setTouchingCellIndex', setTouchingCellIndex)

// 更新所有Cell的索引
const updateCellIndices = () => {
    // 这里可以实现索引更新逻辑
    // 例如通过事件总线通知所有Cell
}

// 组件卸载时清理
onUnmounted(() => {
    cells.value = []
});

const groupClass = computed(() => {
    const classes = [];
    if (props.radius) {
        classes.push('radius');
    }
    if (props.usePadding) {
        classes.push('use-padding');
    }
    return classes;
});

const contentStyle = computed(() => {
    const styles: Record<any, any> = {};
    if (props.background) {
        styles.background = props.background;
    }
    return styles;
});

const onClick = (e: any) => {
    emit('click', e);
};
</script>

<template>
    <div class="cell-group" :class="groupClass" @click="onClick($event)">
        <div class="title" v-if="slots['title'] || props.title">
            <div class="title-prefix">
                <!-- @slot 标题 -->
                <slot name="title" v-if="slots['title']"/>
                <template v-else>{{ props.title }}</template>
            </div>
            <div class="title-suffix" v-if="slots['titleSuffix'] || props.titleSuffix">
                <!-- @slot 标题右侧内容 -->
                <slot name="titleSuffix" v-if="slots['titleSuffix']"/>
                <template v-else>{{ props.titleSuffix }}</template>
            </div>
        </div>
        <div class="content" :style="contentStyle">
            <!--            <slot-->
            <!--                :cells="cells"-->
            <!--                :isFirst="(index) => index === 0"-->
            <!--                :isLast="(index) => index === cells.length - 1"-->
            <!--            />-->
            <!-- @slot 主要内容，一般是wu-cell -->
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

.cell-group {
    font-size: vars.$wu-font-size-base;

    .title {
        font-size: calc(vars.$wu-font-size-base * 1.2);
        margin-bottom: calc(vars.$wu-margin / 2);
        padding: 0 vars.$wu-padding;
        display: flex;
        align-items: flex-end;
        gap: vars.$wu-margin;

        .title-prefix {
            flex: 1;
        }

        .title-suffix {
            font-size: vars.$wu-font-size-base;
        }
    }

    .content {
        background: #fff;
        overflow: hidden;
    }

    .footer {
        font-size: vars.$wu-font-size-sm;
        color: vars.$wu-text-color-light;
        margin-top: calc(vars.$wu-margin / 3);
        padding: 0 vars.$wu-padding;
    }
}

.cell-group.use-padding {
    padding: vars.$wu-padding;
}

.cell-group.radius {
    .content {
        border-radius: vars.$wu-border-radius;
    }
}
</style>