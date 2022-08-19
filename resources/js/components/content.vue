<template>
    <div class="app-content">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: "content-component",
}
</script>

<style scoped>

</style>
