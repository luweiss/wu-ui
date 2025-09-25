<script setup lang="ts">
import {ref, watch, getCurrentInstance, computed, nextTick, useSlots} from 'vue';
import WuButton from "../wu-button/wu-button.vue";
import WuScrollView from "../wu-scroll-view/wu-scroll-view.vue";

/**
 * 半屏弹出框，从页面底部弹出
 * @example
 * <script setup>
 *     import {ref} from 'vue';
 *     const state = ref(false)
 * </script\>
 * <template>
 *   <div>
 *       <wu-button @click="state = true">显示</wu-button>
 *       <wu-popup v-model="state">
 *           弹出框内容
 *       </wu-popup>
 *   </div>
 * </template>
 */

defineOptions({
    name: 'WuPopup',
    options: {
        virtualHost: true,
    },
});

const model = defineModel();
// 外部传入的props
const props = withDefaults(defineProps<{
    /**
     * 弹窗标题
     */
    title?: string,

    /**
     * 最小高度
     * @default '500rpx'
     */
    minHeight?: string,

    /**
     * 最大高度
     * @default 'calc(100vh - 30rpx)'
     */
    maxHeight?: string,

    /**
     * 高度
     * @default '40vh'
     */
    height?: string,

    /**
     */
    moreNav?: boolean,

    /**
     * 显示背景
     * @default true
     */
    showMask?: boolean,

    /**
     * 背景颜色
     * @default 'rgba(0, 0, 0, 0.5)'
     */
    maskColor?: string,

    /**
     * 允许点击背景关闭
     * @default true
     */
    maskClosable?: boolean,

    /**
     * 允许下滑关闭
     * @default true
     */
    swipeDownClosable?: boolean,

    /**
     * 动画时间,单位ms
     * @default 250
     */
    duration?: number,

    /**
     * 显示取消按钮
     * @default true
     */
    showCancel?: boolean,

    /**
     * 取消按钮文字
     * @default '取消'
     */
    cancelText?: string,

    /**
     * 取消按钮disabled状态
     * @default undefined
     */
    cancelDisabled?: boolean,

    /**
     * 取消按钮loading状态
     * @default undefined
     */
    cancelLoading?: boolean,

    /**
     * 允许点击取消按钮关闭
     * @default
     */
    cancelClosable?: boolean,

    /**
     * 显示确认按钮
     * @default true
     */
    showConfirm?: boolean,

    /**
     * 确认按钮文字
     * @default '确认'
     */
    confirmText?: string,

    /**
     * 确认按钮disabled状态
     */
    confirmDisabled?: boolean,

    /**
     * 确认按钮loading状态
     */
    confirmLoading?: boolean,

    /**
     * 允许点击确认按钮关闭
     * @default true
     */
    confirmClosable?: boolean,

    /**
     * 弹窗内容的背景色
     * @default '#ffffff'
     * @example '#ffffff'
     * @example 'transparent'
     */
    popupBackground?: string,
}>(), {
    title: '',
    minHeight: '500rpx',
    maxHeight: 'calc(100vh - 30rpx)',
    height: '40vh',
    showMask: true,
    maskColor: 'rgba(0, 0, 0, 0.5)',
    maskClosable: true,
    swipeDownClosable: true,
    duration: 250,
    showCancel: true,
    cancelText: '取消',
    cancelClosable: true,
    showConfirm: true,
    confirmText: '完成',
    confirmClosable: true,
    popupBackground: '#ffffff',
});

const slots = useSlots();
const scrollViewRef = ref(null);

// 事件
const emit = defineEmits<{
    /**
     * 点击取消时触发
     */
    cancel: [e: Event],
    /**
     * 点击确认时触发
     */
    confirm: [e: Event],
}>();

// 内部状态
const pageScrollTop = ref(0);
const instance = getCurrentInstance();
const pageStyle = ref(''); // 存储页面原始样式
let preventScrollStyle: HTMLStyleElement | null = null; // H5中用于存储动态样式
const containerHeight = ref<number | undefined>(0); // 容器高度
const swipeDownClosableValue = ref(100); // 下滑关闭阀值(根据 容器高度/3 计算),默认是最小值100
const swipeDownClosableValueMax = 180; // 下滑关闭阀值(最大值)


// 保存当前滚动位置
const saveScrollPosition = () => {
    if (!instance) return;
    // #ifdef MP-WEIXIN
    // 微信小程序中获取滚动位置
    uni.createSelectorQuery()
        .in(instance)
        .selectViewport()
        .scrollOffset(() => {
        })
        .exec((res) => {
            if (res && res[0]) {
                pageScrollTop.value = res[0].scrollTop;
            }
        });
    // #endif

    // #ifdef H5
    // H5中获取滚动位置
    pageScrollTop.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // #endif
};

// 恢复滚动位置
const restoreScrollPosition = () => {
    if (pageScrollTop.value > 0) {
        // #ifdef MP-WEIXIN
        uni.pageScrollTo({
            scrollTop: pageScrollTop.value,
            duration: 0
        });
        // #endif

        // #ifdef H5
        window.scrollTo(0, pageScrollTop.value);
        // #endif
    }
};

// 禁止/允许底层滚动
const preventScroll = (isPrevent: boolean) => {
    // #ifdef MP-WEIXIN
    // 微信小程序实现
    const pages: any[] = getCurrentPages();
    const currentPage = pages[pages.length - 1];

    if (currentPage) {
        if (isPrevent) {
            // 保存原始页面样式
            pageStyle.value = currentPage.data.pageStyle || '';
            // 设置新样式禁止滚动
            currentPage.setData({
                pageStyle: 'overflow: hidden; position: fixed; width: 100%;'
            });
        } else {
            // 恢复原始页面样式
            currentPage.setData({
                pageStyle: pageStyle.value
            });
        }
    }
    // #endif

    // #ifdef H5
    // H5实现
    if (isPrevent) {
        // 创建并添加禁止滚动的样式
        preventScrollStyle = document.createElement('style');
        preventScrollStyle.id = 'popup-prevent-scroll';
        preventScrollStyle.textContent = `
      body {
        overflow: hidden !important;
        touch-action: none !important;
      }
      .uni-page-body {
        overflow: hidden !important;
        position: fixed !important;
        width: 100% !important;
        top: -${pageScrollTop.value}px !important;
      }
    `;
        document.head.appendChild(preventScrollStyle);
    } else {
        // 移除禁止滚动的样式
        if (preventScrollStyle && document.getElementById('popup-prevent-scroll')) {
            document.head.removeChild(preventScrollStyle);
            preventScrollStyle = null;
        }
    }
    // #endif
};

// 点击遮罩层关闭
const onMaskClick = ($event: Event) => {
    if (props.maskClosable) {
        cancel($event);
    }
};

// 点击取消
const cancel = ($event: Event) => {
    if (props.cancelClosable) {
        model.value = false;
    }
    emit('cancel', $event);
};

// 点击确认
const confirm = ($event: Event) => {
    if (props.confirmClosable) {
        model.value = false;
    }
    emit('confirm', $event);
};

const popupDisplayValue = ref('none');
const popupShowClass = ref('');
// popup动态样式
const popupStyle = computed(() => {
    return {
        display: popupDisplayValue.value,
        transitionDuration: props.duration + 'ms',
    };
});
// popup动态class
const popupClass = computed(() => {
    const classes = [popupShowClass.value];
    if (props.popupBackground === 'dark' || props.popupBackground === 'light') {
        classes.push('bg-' + props.popupBackground);
    }
    return classes;
});

// mask动态样式
const maskStyle = computed(() => {
    return {
        transitionDuration: props.duration + 'ms',
        backgroundColor: props.maskColor,
    };
});

// container动态样式
const containerStyle = computed(() => {
    const style: Record<any, any> = {
        transitionDuration: props.duration + 'ms',
        minHeight: props.minHeight,
        maxHeight: props.maxHeight,
        height: props.height,
    };
    if (moveClientY.value > 0) {
        style['transition-property'] = 'none';
        style['transform'] = 'translate3d(0, ' + moveClientY.value + 'px, 0)';
    }
    return style;
});

const scrollStyle = computed(() => {
    return {};
});

const originalClientY = ref(0);
const moveClientY = ref(0);
const onScrollTouchMove = (e: TouchEvent) => {
    if (!props.swipeDownClosable) return;
    if (originalClientY.value === 0) {
        originalClientY.value = e.touches[0].clientY;
    } else {
        moveClientY.value = e.touches[0].clientY - originalClientY.value;
    }
}
const onScrollTouchEnd = (e: TouchEvent) => {
    if (!props.swipeDownClosable) return;
    if (moveClientY.value > swipeDownClosableValue.value) {
        model.value = false;
        emit('cancel', e);
    }
    originalClientY.value = 0;
    moveClientY.value = 0;
}

const getContainerHeight = () => {
    return new Promise<UniNamespace.NodeInfo | null>((resolve) => {
        if (!instance) {
            resolve(null);
            return;
        }
        uni.createSelectorQuery().in(instance.proxy)
            .select(".container")
            .boundingClientRect((container) => {
                if (Array.isArray(container)) {
                    resolve(container[0]);
                } else {
                    resolve(container);
                }
            }).exec();
    });
};

// 监听显示状态变化
watch(() => model.value,
    (newVal) => {
        if (newVal) {
            // 显示弹窗
            saveScrollPosition();
            preventScroll(true);
            popupDisplayValue.value = 'block';
            setTimeout(() => {
                nextTick(() => {
                    popupShowClass.value = 'show';
                    onShow();
                });
            }, props.duration / 10);
        } else {
            // 关闭弹窗
            preventScroll(false);
            restoreScrollPosition();
            popupShowClass.value = '';
            setTimeout(() => {
                popupDisplayValue.value = 'none';
                onClose();
            }, props.duration);
        }
    },
    {immediate: true});

const onShow = () => {
    getContainerHeight().then(e => {
        if (!e || !e.height) return;
        containerHeight.value = e.height;
        const val = e.height / 3;
        if (val > swipeDownClosableValue.value) {
            swipeDownClosableValue.value = val < swipeDownClosableValueMax ? val : swipeDownClosableValueMax;
        }
    });
};

const onClose = () => {
};

defineExpose({
    /**
     * 取消
     */
    cancel,
    /**
     * 确认
     */
    confirm,
    /**
     * 获取内容的wu-scroll-view实例
     */
    getScrollView: () => {
        return scrollViewRef.value;
    },
});
</script>

<template>
    <div class="popup"
         :class="popupClass"
         catchtouchmove="true"
         :style="popupStyle">
        <!-- 遮罩层 -->
        <div v-if="showMask"
             class="mask"
             @click="onMaskClick($event)"
             catchtouchmove="true"
             :style="maskStyle"></div>

        <!-- 弹窗内容 -->
        <div class="container"
             @touchmove="onScrollTouchMove"
             @touchend="onScrollTouchEnd"
             :style="containerStyle">

            <!-- 顶部操作栏 -->
            <div class="header">
                <div class="cancel">
                    <wu-button v-if="showCancel"
                               @click="cancel($event)"
                               :disabled="props.cancelDisabled"
                               :loading="props.cancelLoading"
                               text>
                        {{ props.cancelText }}
                    </wu-button>
                </div>
                <div class="title">{{ title }}</div>
                <div class="confirm">
                    <wu-button v-if="showConfirm"
                               @click="confirm($event)"
                               type="primary"
                               :disabled="props.confirmDisabled"
                               :loading="props.confirmLoading"
                               text>
                        {{ props.confirmText }}
                    </wu-button>
                </div>
            </div>

            <!-- 内容区域 -->
            <div class="body">

                <wu-scroll-view ref="scrollViewRef"
                                scroll-y
                                :custom-style="scrollStyle">
                    <div class="scroll-view-container">
                        <!-- @slot 内容部分 -->
                        <slot/>
                    </div>
                </wu-scroll-view>
            </div>

            <!-- 下滑还有更多指示器 -->
            <div class="more-nav" v-if="props.moreNav">
                <!-- @slot 还有更多内容的状态指示器 -->
                <slot name="more-nav"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../vars.scss";

.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: vars.$wu-popup-index;
    pointer-events: none;

    /* 遮罩层 */
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition-property: opacity;
        pointer-events: auto;
    }

    /* 弹窗内容 */
    .container {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-top-left-radius: vars.$wu-border-radius-lg;
        border-top-right-radius: vars.$wu-border-radius-lg;
        overflow: hidden;
        padding-bottom: vars.$wu-safe-padding-bottom;

        transition-property: transform;
        transform: translate3d(0, 100%, 0);

        /* 弹窗头部样式 */
        .header {
            display: flex;
            gap: vars.$wu-margin;
            justify-content: space-between;
            align-items: center;
            position: relative;
            padding: vars.$wu-padding;

            .cancel {
                min-width: 150rpx;
            }

            .title {
                font-size: vars.$wu-font-size-base;
            }

            .confirm {
                min-width: 150rpx;
                display: flex;
                justify-content: flex-end;
            }
        }


        /* 弹窗内容区域 */
        .body {
            flex: 1;
            overflow: hidden;

            .scroll-view-container {
                padding: vars.$wu-padding;
            }
        }

        .more-nav {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
}

.popup.bg-white {
    .container {
        background: #ffffff;
    }
}

.popup.bg-dark {
    .container {
        background: vars.$wu-background-dark;
    }
}

.popup.bg-light {
    .container {
        background: vars.$wu-background-light;
    }
}

.popup.show {
    /* 显示遮罩层 */
    .mask {
        opacity: 1;
    }

    .container {
        transform: translate3d(0, 0, 0);
    }
}

/* H5平台特殊样式 */
/* #ifdef H5 */
.popup {
    -webkit-overflow-scrolling: touch;
}

/* #endif */
</style>
