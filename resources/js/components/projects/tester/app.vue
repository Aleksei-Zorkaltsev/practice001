<template>
    <div class="tester-app">
        <h2 class="tester-app-title">ТЕСТЫ</h2>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "tester-app",

    methods: mapActions('tester', ['initStorage']),

    mounted(){
        this.initStorage();
    },
}
</script>

<style scoped>

</style>
