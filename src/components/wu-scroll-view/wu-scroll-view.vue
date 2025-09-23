<script setup lang="ts">
import {onMounted, ref, nextTick, getCurrentInstance, computed} from "vue";

/**
 * 滚动内容
 * @example
 *   <wu-scroll-view>
 *       主要内容
 *   </wu-scroll-view>
 */

defineOptions({
    name: 'WuScrollView',
    options: {
        virtualHost: true,
    },
});

const emit = defineEmits<{
    /**
     * 滚动时触发
     * @property event {Event} 触发事件
     */
    scroll: [event: Event],
    /**
     * 滚动到顶部时触发
     * @property event {Event} 触发事件
     */
    scrolltoupper: [event: Event],
    /**
     * 滚动到底部时触发
     * @property event {Event} 触发事件
     */
    scrolltolower: [event: Event],
}>();
const instance = getCurrentInstance();
const props = withDefaults(defineProps<{
    /**
     * 允许Y轴滚动
     * @default true
     */
    scrollY?: boolean,

    /**
     * 允许X轴滚动
     * @default false
     */
    scrollX?: boolean,

    /**
     * 滚动位置距离顶部
     * @default 0
     */
    scrollTop?: number,

    /**
     * 滚动时使用动画
     * @default true
     */
    scrollWithAnimation?: boolean,

    /**
     * 滚动动画时间
     * @default 250
     */
    animationDuration?: number,

    /**
     * 自定义样式
     */
    customStyle?: Record<any, any> | any,

    /**
     * 内容部分自定义样式
     */
    contentStyle?: Record<any, any> | any,

    /**
     * 隐藏滚动条
     * @default false
     */
    hideScrollBar?: boolean,
}>(), {
    scrollY: true,
    scrollTop: 0,
    scrollWithAnimation: true,
    animationDuration: 250,
});

const scrollClass = computed(() => {
    return {
        'hide-scroll-bar': props.hideScrollBar,
    };
});

const scrollTopMix = ref(0);
const tapScrollTop = ref(0);
const scrollHeight = ref(0);
const scrollTo = (val: number) => {
    updateScrollHeight().then(e => {
        scrollTopMix.value = tapScrollTop.value;
        nextTick(() => {
            if (val < 0) {
                scrollTopMix.value = scrollHeight.value + val + 1;
            } else {
                scrollTopMix.value = val;
            }
        });
    });
};

const onScroll = (e: any) => {
    tapScrollTop.value = e.detail.scrollTop;
    emit('scroll', e);
};

const onScrollToUpper = (e: any) => {
    tapScrollTop.value = 0;
    emit('scrolltoupper', e);
};
const onScrollToLower = (e: any) => {
    emit('scrolltolower', e);
};

const updateScrollHeight = () => {
    return new Promise((resolve) => {
        nextTick(() => {
            getScrollHeight().then((res) => {
                scrollHeight.value = res;
                resolve(res);
            });
        });
    });
};

const getScrollHeight = (): Promise<number> => {
    return new Promise((resolve) => {
        if (!instance) {
            resolve(0);
            return;
        }
        uni.createSelectorQuery().in(instance.proxy)
            .select(".scroll-view")
            .boundingClientRect((scroll) => {
                // console.log(".scroll-view->", scroll);
                if (!scroll) {
                    resolve(0);
                    return;
                }
                uni.createSelectorQuery().in(instance.proxy)
                    .select(".content")
                    .boundingClientRect((content) => {
                        // console.log(".content->", content);
                        if (!content) {
                            resolve(0);
                            return;
                        }
                        if (Array.isArray(scroll)) {
                            scroll = scroll[0];
                        }
                        if (Array.isArray(content)) {
                            content = content[0];
                        }
                        // 确保 content.height 和 scroll.height 存在
                        const contentHeight = content.height ?? 0;
                        const scrollHeight = scroll.height ?? 0;
                        resolve(contentHeight - scrollHeight);
                    }).exec();

            }).exec();
    });
};

onMounted(() => {
    updateScrollHeight();
});

defineExpose({
    /**
     * 滚动到指定位置,scrollTo(100)
     */
    scrollTo,
    /**
     * 更新滚动组件高度,updateScrollHeight().then(height=>{});
     */
    updateScrollHeight,
    /**
     * 获取滚动高度,getScrollHeight().then(height=>{});
     */
    getScrollHeight,
    /**
     * 当前滚动位置
     */
    scrollTop: tapScrollTop,
});
</script>

<template>
    <scroll-view
        class="scroll-view"
        :class="scrollClass"
        :style="props.customStyle"
        :scroll-y="props.scrollY"
        :scroll-x="props.scrollX"
        :scroll-with-animation="props.scrollWithAnimation"
        :animation-duration="props.animationDuration"
        :scroll-top="scrollTopMix"
        @scrolltoupper="onScrollToUpper"
        @scrolltolower="onScrollToLower"
        @scroll="onScroll">
        <div class="content" :style="props.contentStyle">
            <slot/>
        </div>
    </scroll-view>
</template>
<style scoped lang="scss">
.scroll-view {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;

    .content {
    }
}
</style>
<style lang="scss">
.scroll-view.hide-scroll-bar {
    /* 核心：隐藏滚动条 */
    /* 隐藏Android滚动条 */
    scrollbar-width: none;
    /* 隐藏iOS滚动条 */
    -webkit-overflow-scrolling: touch;

    .uni-scroll-view {
        /* 核心：隐藏滚动条 */
        /* 隐藏Android滚动条 */
        scrollbar-width: none;
        /* 隐藏iOS滚动条 */
        -webkit-overflow-scrolling: touch;
    }
}

.scroll-view.hide-scroll-bar ::-webkit-scrollbar,
.scroll-view.hide-scroll-bar::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
}
</style>