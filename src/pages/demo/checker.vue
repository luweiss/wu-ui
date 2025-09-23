<script setup lang="ts">
import {ref} from "vue";

const state = ref(false);
const state2 = ref(false);
const state3 = ref(0);
</script>

<template>
    <div style="background: #ededed; min-height: 100vh">
        <wu-section>
            <wu-cell-group title="常规" radius>
                <wu-cell>
                    <template #label>
                        state: {{ state }}
                    </template>
                    <wu-checker v-model="state"></wu-checker>
                </wu-cell>
                <wu-cell>
                    <template #label>
                        state: {{ state }}
                    </template>
                    <wu-checker v-model="state" circle></wu-checker>
                </wu-cell>
                <wu-cell>
                    <template #label>
                        state: {{ state }}
                    </template>
                    <wu-checker v-model="state" switch></wu-checker>
                </wu-cell>
            </wu-cell-group>
            <wu-cell-group title="自定义值" radius>
                <wu-cell>
                    <template #label>
                        state2: {{ state2 }}
                    </template>
                    <wu-checker v-model="state2"
                               :true-value="false"
                               :false-value="true"
                    ></wu-checker>
                </wu-cell>
                <wu-cell>
                    <template #label>
                        state3: {{ state3 }}
                    </template>
                    <wu-checker v-model="state3"
                               :true-value="1"
                               :false-value="0"
                    ></wu-checker>
                </wu-cell>
                <wu-cell>
                    <template #label>
                        state3: {{ state3 }}
                    </template>
                    <wu-checker v-model="state3"
                               disabled
                               :true-value="1"
                               :false-value="0"
                    ></wu-checker>
                </wu-cell>
                <wu-cell>
                    <template #label>
                        state3: {{ state3 }}
                    </template>
                    <wu-checker v-model="state3"
                               disabled
                               circle
                               :true-value="1"
                               :false-value="0"
                    ></wu-checker>
                </wu-cell>
                <wu-cell>
                    <template #label>
                        state3: {{ state3 }}
                    </template>
                    <wu-checker v-model="state3"
                               disabled
                               switch
                               :true-value="1"
                               :false-value="0"
                    ></wu-checker>
                </wu-cell>
            </wu-cell-group>
        </wu-section>
    </div>
</template>

<style scoped lang="scss">

</style>