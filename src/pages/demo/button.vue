<script setup lang="ts">
const types = ['default', 'primary', 'info', 'warning', 'danger'];
const sizes = ['base', 'sm', 'lg'];
const weights = ['normal', 'lighter', 'bold'];
</script>

<template>
    <div style="background: #ededed; min-height: 100vh">
        <wu-section title="常规">
            <div>
                <wu-button v-for="t in types" :key="t" :type="t">type: {{ t }}</wu-button>
            </div>
        </wu-section>
        <wu-section title="size">
            <div v-for="s in sizes" :key="s">
                <wu-button v-for="t in types" :key="t" :type="t" :size="s">size: {{ s }}</wu-button>
            </div>
        </wu-section>
        <wu-section title="weight">
            <div v-for="w in weights" :key="w">
                <wu-button v-for="t in types" :key="t" :type="t" :weight="w">weight: {{ w }}</wu-button>
            </div>
        </wu-section>

        <wu-section title="weak">
            <div>
                <wu-button v-for="t in types" :key="t" weak>weak: true</wu-button>
            </div>
        </wu-section>

        <wu-section title="text">
            <div v-for="s in sizes" :key="s">
                <wu-button v-for="t in types"
                          :key="t"
                          :type="t"
                          text
                          :size="s">text: true
                </wu-button>
            </div>
        </wu-section>
        <wu-section title="loading">
            <div v-for="s in sizes" :key="s">
                <wu-button v-for="t in types"
                          :key="t"
                          :type="t"
                          loading
                          :size="s">loading: true
                </wu-button>
            </div>
        </wu-section>
        <wu-section title="disabled">
            <div v-for="s in sizes" :key="s">
                <wu-button v-for="t in types"
                          :key="t"
                          :type="t"
                          disabled
                          :size="s">disabled: true
                </wu-button>
            </div>
        </wu-section>
        <wu-section title="loading & disabled">
            <div v-for="s in sizes" :key="s">
                <wu-button v-for="t in types"
                          :key="t"
                          :type="t"
                          disabled
                          loading
                          :size="s">loading: true, disabled: true
                </wu-button>
            </div>
        </wu-section>
        <wu-section title="radius: false">
            <div v-for="s in sizes" :key="s">
                <wu-button v-for="t in types"
                          :key="t"
                          :type="t"
                          :radius="false"
                          :size="s">loading: true, disabled: true
                </wu-button>
            </div>
        </wu-section>
        <wu-section title="block">
            <div v-for="s in sizes" :key="s">
                <wu-button v-for="t in types"
                          :key="t"
                          :type="t"
                          block
                          :size="s">loading: true, disabled: true
                </wu-button>
            </div>
        </wu-section>
        <wu-section title="infinity">
            <div v-for="t in types" :key="t" style="height: 200rpx; width: 100%">
                <wu-button
                    :type="t"
                    infinity>infinity: true
                </wu-button>
            </div>
        </wu-section>
    </div>
</template>

<style scoped lang="scss">

</style>