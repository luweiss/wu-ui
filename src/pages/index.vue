<script setup lang="ts">
</script>
<template>
    <div style="background: #ededed; min-height: 100vh">
        <wu-section>
            <wu-cell-group radius>
                <wu-cell label="Button" url="/pages/demo/button" show-arrow></wu-cell>
                <wu-cell label="Cell" url="/pages/demo/cell" show-arrow></wu-cell>
                <wu-cell label="Checker" url="/pages/demo/checker" show-arrow></wu-cell>
                <wu-cell label="Icon" url="/pages/demo/icon" show-arrow></wu-cell>
                <wu-cell label="Input" url="/pages/demo/input" show-arrow></wu-cell>
                <wu-cell label="InputNumber" url="/pages/demo/input-number" show-arrow></wu-cell>
                <wu-cell label="Popup" url="/pages/demo/popup" show-arrow></wu-cell>
                <wu-cell label="ScrollView" url="/pages/demo/scroll-view" show-arrow></wu-cell>
                <wu-cell label="Swipe" url="/pages/demo/swipe" show-arrow></wu-cell>
            </wu-cell-group>
        </wu-section>
    </div>
</template>

<style scoped>
.content {
    min-height: 100vh;
    background: #ededed;
    padding: 30rpx;
}
</style>
