<script setup lang="ts">

const icons = [
    'love-filling',
    'comment-filling',
    'error',
    'help',
    'prompt',
    'search',
    'success',
    'delete-filling',
    'help-filling',
    'success-filling',
    'prompt-filling',
    'loading',
    'add',
    'arrow-down',
    'arrow-right',
];
</script>

<template>
    <div style="background: #ededed; min-height: 100vh">
        <wu-section>
            <wu-cell-group title="常规" radius>
                <wu-cell v-for="icon in icons" :key="icon" :label="icon">
                    <wu-icon :icon="icon"></wu-icon>
                </wu-cell>
            </wu-cell-group>
            <wu-cell-group title="weight: bold" radius>
                <wu-cell v-for="icon in icons" :key="icon" :label="icon">
                    <wu-icon :icon="icon" weight="bold"></wu-icon>
                </wu-cell>
            </wu-cell-group>
            <wu-cell-group title="color: #f00" radius>
                <wu-cell v-for="icon in icons" :key="icon" :label="icon">
                    <wu-icon :icon="icon" color="#f00"></wu-icon>
                </wu-cell>
            </wu-cell-group>
            <wu-cell-group title="size: 80rpx" radius>
                <wu-cell v-for="icon in icons" :key="icon" :label="icon">
                    <wu-icon :icon="icon" size="80rpx"></wu-icon>
                </wu-cell>
            </wu-cell-group>
            <wu-cell-group title="type: primary" radius>
                <wu-cell v-for="icon in icons" :key="icon" :label="icon">
                    <wu-icon :icon="icon" type="primary"></wu-icon>
                </wu-cell>
            </wu-cell-group>
            <wu-cell-group title="loading: true" radius>
                <wu-cell v-for="icon in icons" :key="icon" :label="icon">
                    <wu-icon :icon="icon" loading></wu-icon>
                </wu-cell>
            </wu-cell-group>
        </wu-section>
    </div>
</template>

<style scoped lang="scss">

</style>