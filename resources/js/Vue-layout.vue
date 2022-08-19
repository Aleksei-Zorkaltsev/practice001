<template>
    <div>
        <window-app></window-app>
    </div>
</template>

<script>
    import windowApp from './components/app-window';

    export default {
        name: "layout",
        components: {
            'window-app': windowApp,
        }
    }
</script>

<style scoped>

</style>