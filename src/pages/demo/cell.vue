<script setup lang="ts">
import {ref} from "vue";

const data = ref(['张三', '李四', '王五']);
</script>

<template>
    <div style="background: #ededed; min-height: 100vh">
        <wu-section>
            <wu-cell-group title="基础用法">
                <wu-cell label="姓名">张三</wu-cell>
                <wu-cell label="年龄">25</wu-cell>
                <wu-cell label="职业">法师</wu-cell>
                <wu-cell label="介绍">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Accusantium aliquid consequatur doloremque earum eos esse
                        explicabo fuga fugiat harum iusto laborum magni molestias
                        necessitatibus nihil nobis, nostrum provident quae quidem
                        quod repellendus rerum similique suscipit temporibus tenetur
                        ullam unde velit voluptatibus?
                    </p>
                </wu-cell>
            </wu-cell-group>
            <wu-cell-group title="左侧图标">
                <wu-cell label="prefix-icon" prefix-icon="help">help</wu-cell>
                <wu-cell label="prefix-icon" prefix-icon="error">error</wu-cell>
                <wu-cell label="prefix-icon" prefix-icon="stop">stop</wu-cell>
                <wu-cell>
                    <template #prefixIcon>
                        <div style="padding: 20rpx 0;">
                            <img src="https://picsum.photos/200/300" alt="" style="width: 120rpx; height: 120rpx">
                        </div>
                    </template>
                    使用#prefixIcon插槽可以替换成其他内容
                </wu-cell>
            </wu-cell-group>
            <wu-cell-group title="右侧图标">
                <wu-cell label="suffix-icon" suffix-icon="help">help</wu-cell>
                <wu-cell label="suffix-icon" suffix-icon="error">error</wu-cell>
                <wu-cell label="suffix-icon" suffix-icon="stop">stop</wu-cell>
            </wu-cell-group>
            <wu-cell-group title="其他属性">
                <wu-cell label="show-arrow" show-arrow>true</wu-cell>
                <wu-cell label="feedback" :feedback="false">false</wu-cell>
                <wu-cell label="url" url="/pages/index">/pages/index</wu-cell>
                <template #footer>
                    <p>如果使用了show-arrow属性，那将会覆盖掉suffix-icon属性</p>
                </template>
            </wu-cell-group>
            <wu-cell-group title="wu-cell-group.radius: true" radius>
                <wu-cell label="姓名">张三</wu-cell>
                <wu-cell label="年龄">25</wu-cell>
                <wu-cell label="职业">法师</wu-cell>
            </wu-cell-group>


            <wu-cell-group title="左滑操作">
                <!-- 注意不要使用index作为key，不然删除某一行后，样式状态会转移给下一行 -->
                <TransitionGroup name="cell-item">
                    <wu-cell v-for="(n, i) in data" :key="n"
                            swipe-enabled
                            label="姓名">
                        <template #hidden-content>
                            <div class="options">
                                <div class="item danger" @click="data.splice(i, 1)">删除</div>
                                <div class="item primary" @click="uni.showToast({title: n, icon: 'none'})">信息</div>
                            </div>
                        </template>
                        {{ n }}
                    </wu-cell>
                </TransitionGroup>
                <template #footer>
                    <wu-button @click="data.push('user-'+ (data.length+1))" text type="primary">添加</wu-button>
                </template>
            </wu-cell-group>
        </wu-section>
    </div>
</template>

<style scoped lang="scss">

.options {
    display: flex;
    height: 100%;
    overflow: hidden;

    .item {
        flex: 1;
        background: #000;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .item.primary {
        background: #07c160;
    }

    .item.primary:active {
        background: #19b061;
    }

    .item.danger {
        background: #fa5151;
    }

    .item.danger:active {
        background: #b93737;
    }
}

.cell-item-enter-active,
.cell-item-leave-active {
    transition-property: transform, opacity;
    transition-duration: 500ms;
}

.cell-item-enter-from {
    opacity: 0;
    transform: translateX(-50rpx);
}

.cell-item-leave-to {
    opacity: 0;
    transform: translateX(50rpx);
}
</style>