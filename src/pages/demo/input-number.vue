<script setup lang="ts">
import {ref} from 'vue';

const value = ref(0);
</script>

<template>
    <div style="background: #ededed; min-height: 100vh">
        <wu-section title="常规">
            <wu-input-number v-model="value"></wu-input-number>
        </wu-section>
    </div>
</template>

<style scoped lang="scss">

</style>