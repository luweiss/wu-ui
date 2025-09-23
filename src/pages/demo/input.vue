<script setup lang="ts">
import {ref} from 'vue';

const message = ref('');
</script>

<template>
    <div style="background: #ededed; min-height: 100vh">
        <wu-section title="常规">
            <wu-input v-model="message" placeholder="在此输入"/>
        </wu-section>
        <wu-section title="with-border: true">
            <wu-input v-model="message" placeholder="在此输入" with-border/>
        </wu-section>
        <wu-section title="clearable: true">
            <wu-input v-model="message" placeholder="在此输入" clearable/>
            <wu-input v-model="message" placeholder="在此输入" with-border clearable/>
        </wu-section>
        <wu-section title="在cell中使用, align: right">
            <wu-cell-group>
                <wu-cell label="姓名">
                    <wu-input v-model="message" placeholder="在此输入" clearable align="right"/>
                </wu-cell>
                <wu-cell label="地址">
                    <wu-input v-model="message" placeholder="在此输入" clearable align="right"/>
                </wu-cell>
            </wu-cell-group>
        </wu-section>
        <wu-section title="在透明cell中使用">
            <wu-cell-group background="transparent">
                <wu-cell label="姓名">
                    <wu-input v-model="message" placeholder="在此输入" clearable align="right"/>
                </wu-cell>
                <wu-cell label="地址">
                    <wu-input v-model="message" placeholder="在此输入" clearable align="right"/>
                </wu-cell>
            </wu-cell-group>
        </wu-section>
    </div>
</template>

<style scoped lang="scss">

</style>