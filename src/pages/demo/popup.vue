<script setup lang="ts">
import {ref} from 'vue';

const popup1 = ref(false);
const popup12 = ref(false);
const popup14 = ref(false);
const popup2 = ref(false);
const popup3 = ref(false);
const popup4 = ref(false);
const popup5 = ref(false);
</script>

<template>

    <div style="background: #ededed; min-height: 100vh">

        <wu-section>
            <div v-for="i in 10" :key="i">
                测试滚动
            </div>

            <wu-button @click="popup1 = true">常规弹窗</wu-button>
            <wu-popup title="弹窗标题" v-model="popup1">
                <div>弹窗内容</div>
                <wu-button @click="popup14 = true"
                          type="primary"
                          style="margin: 30rpx">再弹一个
                </wu-button>
            </wu-popup>
            <wu-popup v-model="popup14" title="嵌套弹窗"></wu-popup>

            <wu-button @click="popup12 = true">不允许下滑关闭</wu-button>
            <wu-popup title="弹窗标题" v-model="popup12" :swipeDownClosable="false">
                <div>弹窗内容</div>
            </wu-popup>

            <wu-button @click="popup2 = true">不允许点击背景关闭</wu-button>
            <wu-popup title="弹窗标题" v-model="popup2" :mask-closable="false">
                <div>弹窗内容</div>
            </wu-popup>

            <wu-button @click="popup3 = true">不展示背景</wu-button>
            <wu-popup title="弹窗标题" v-model="popup3" :show-mask="false">
                弹窗内容
            </wu-popup>

            <wu-button @click="popup4 = true">动画加长</wu-button>
            <wu-popup title="弹窗标题" v-model="popup4" :duration="1000">
                弹窗内容
            </wu-popup>

            <wu-button @click="popup5 = true">内容加长</wu-button>
            <wu-popup title="弹窗标题" v-model="popup5" height="85vh">
                <div>
                    <p>
                        清晨的雾霭像一层薄纱，轻轻笼罩着沉睡的村庄。砖瓦房的烟囱里冒出袅袅炊烟，与雾气交织在一起，在晨光中泛着淡淡的金色。村口的老槐树下，几位老人坐在小马扎上，慢悠悠地摇着蒲扇，话着家常。不远处的田埂上，早起的农人已经开始了一天的劳作，锄头碰撞泥土的声音，伴随着清脆的鸟鸣，构成了一首自然的晨曲。
                        午后的阳光透过梧桐树叶的缝隙，在青石板路上洒下斑驳的光影。巷子里传来孩童嬉笑打闹的声音，偶尔有卖冰棍的三轮车驶过，叮铃铃的铃声回荡在空气中。墙角的牵牛花不知何时爬上了斑驳的墙壁，紫色的花瓣在微风中轻轻摇曳，散发着淡淡的清香。老人们搬来竹椅，在树荫下打盹，脸上带着满足的微笑。
                        傍晚时分，夕阳将天空染成了绚丽的橘红色。家家户户的屋顶上，升起了新一轮的炊烟，饭菜的香气在空气中弥漫。孩子们被母亲的呼唤声召回，洗去一身的泥土，围坐在饭桌旁，等待着热腾腾的饭菜。远处的稻田里，晚归的鸟儿成群结队地飞过，留下几声清脆的鸣叫，为这宁静的乡村傍晚画上完美的句号。
                        As the first rays of sunlight peek over the horizon, the city slowly awakens from its slumber.
                        Street lamps flicker off one by one, giving way to the growing brightness of dawn. Early risers
                        jog
                        along the tree-lined boulevards, their footsteps echoing softly against the quiet backdrop.
                        Coffee
                        shops begin to open their doors, releasing the rich aroma of freshly brewed coffee into the
                        crisp
                        morning air.
                        By midday, the city is in full swing. Traffic flows steadily through the streets, with cars,
                        buses,
                        and bicycles weaving through intersections in an intricate dance. Office buildings hum with
                        activity
                        as professionals go about their work, while street vendors sell their wares from colorful
                        stalls,
                        calling out to passersby. Parks fill with people enjoying their lunch breaks, some sitting on
                        benches engrossed in books, others playing frisbee with friends.
                        As evening approaches, the pace of the city begins to slow. Commuters make their way home,
                        stopping
                        occasionally to pick up groceries or grab a quick dinner. Streetlights flicker on, casting a
                        warm
                        glow over the sidewalks. Restaurants fill with diners, their laughter and conversation spilling
                        out
                        onto the streets. In the parks, musicians play soft melodies while couples stroll hand in hand,
                        savoring the peaceful transition from day to night.

                    </p>
                </div>
            </wu-popup>

            <div v-for="i in 30" :key="i">
                测试滚动
            </div>
        </wu-section>
    </div>

</template>

<style scoped lang="scss">

</style>