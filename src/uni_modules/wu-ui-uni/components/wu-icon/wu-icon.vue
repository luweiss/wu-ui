<script setup lang="ts">
import {computed} from "vue";

/**
 * 使用iconfont图标
 * @example
 *   <wu-icon icon="love-filling"/>
 */

defineOptions({
    name: 'WuIcon',
    options: {
        virtualHost: true,
    },
});

const props = withDefaults(defineProps<{
    /**
     * 图标, 可选值见文档或演示项目
     */
    icon?: string,

    /**
     * 对应 css font-weight 属性
     */
    weight?: 'normal' | 'bold' | 'bolder' | 'light' | 'inherit' | string | number,

    /**
     * 是否进入加载状态(动画旋转图标)
     */
    loading?: boolean,

    /**
     * 对应 css font-size 属性
     */
    size?: string,

    /**
     * 图标颜色类型，默认是文字默认颜色
     */
    type?: "default" | "primary" | "info" | "warning" | "danger" | "light",


    /**
     * 图标颜色，将覆盖掉type属性
     */
    color?: string,

    /**
     * 自定义样式
     * @example {color: '#000'}
     */
    customStyle?: any,
}>(), {
    weight: 'normal',
    loading: false,
});

const classList = computed(() => {
    const classes = ['icon-' + props.icon, 'type-' + props.type];
    if (props.loading) {
        classes.push('loading');
    }
    return classes;
});
const style = computed(() => {
    const style: Record<any, any> = {};
    if (props.color) {
        style['color'] = props.color;
    }
    if (props.weight) {
        style['font-weight'] = props.weight;
    }
    if (props.size) {
        style['font-size'] = props.size;
    }
    return {...style, ...props.customStyle};
});
</script>

<template>
    <div class="iconfont" :class="classList" :style="style"></div>
</template>

<style scoped lang="scss">
@use "../iconfont.scss";
@use "../vars.scss";

.iconfont {
    font-size: vars.$wu-font-size-base;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1em;
    width: 1em;
}

.type-dark {
    color: vars.$wu-text-color-dark;
}

.type-light {
    color: vars.$wu-text-color-light;
}

.type-primary {
    color: vars.$wu-color-primary;
}

.type-success {
    color: vars.$wu-color-success;
}

.type-warning {
    color: vars.$wu-color-warning;
}

.type-danger {
    color: vars.$wu-color-danger;
}

.type-info {
    color: vars.$wu-color-info;
}

.loading::before {
    display: flex;
    width: 100%;
    height: 100%;
    animation: loading 1200ms infinite linear;
    -webkit-animation: loading 1200ms infinite linear; /* Safari and Chrome */
}

@keyframes loading {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loading /* Safari 与 Chrome */
{
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>