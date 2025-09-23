<script setup lang="ts">
import {ref} from "vue";

const scrollRef = ref(null);

const content =
    '《忧伤》\n' +
    '忧伤被泪湿坏了翅膀，\n甲骨文说我太古老，\n一滴血落在粉嫩的腿上，\n油纸伞说浪漫已经死掉。\n' +
    '\n' +
    '《秋日午后》\n' +
    '阳光穿过梧桐叶的缝隙，在青石板路上织出细碎的光斑。我坐在老藤椅上，看祖父用竹篾编织竹篮，篾条在他膝间翻飞，像一群驯服的青蛇。\n' +
    '墙角的菊花开得正盛，浅黄与淡紫在风里轻轻摇晃。祖母端来青瓷茶碗，蒸腾的热气里浮着几片茉莉。"尝尝新采的雨前茶。"她的银发沾着阳光，比茶烟更朦胧。\n' +
    '巷口传来自行车的铃铛声，卖桂花糕的阿婆推着木车走过。甜香漫过斑驳的砖墙，与晾衣绳上的皂角味缠绵。隔壁的花猫跃上矮墙，尾巴扫落几片枯叶，惊起两只麻雀。\n' +
    '祖父的竹篮渐渐成形，他忽然停手，指着西厢房的窗："那株爬山虎，又高了半尺。"我顺着他的目光望去，暗红的藤蔓正沿着灰瓦向上攀爬，像谁在墙上写着未完的信。\n' +
    '暮色漫进来时，茶已微凉。祖父将竹篮放进储物间，那里堆着去年的芦花、前年的莲蓬，还有他年轻时编的竹筐，每一道纹路里都藏着光阴的故事。\n' +
    '远处的烟囱升起炊烟，混着晚归的鸽哨。我收起藤椅时，发现椅脚边多了片银杏叶，金黄的扇面上，阳光正慢慢沉下去。\n\n';

const txt = ref(content);
</script>

<template>
    <div style="background: #ededed; min-height: 100vh">
        <wu-section>
            <div class="control">
                <wu-button @click="scrollRef.scrollTo(0)">to TOP</wu-button>
                <wu-button @click="scrollRef.scrollTo(-1)">to Bottom</wu-button>
                <wu-button @click="scrollRef.scrollTo(80)">to 80</wu-button>
            </div>
            <div>
                <wu-button @click="()=>{txt = txt + content;}">增加文本</wu-button>
            </div>
            <div class="container">
                <wu-scroll-view ref="scrollRef" content-style="padding: 30rpx">
                    <text>{{ txt }}</text>
                </wu-scroll-view>
            </div>
        </wu-section>
    </div>
</template>

<style scoped lang="scss">
.control {
    display: flex;
    justify-content: space-between;
}

.container {
    height: 300rpx;
    border: 1px solid #ddd;
    background: #fff;
}
</style>