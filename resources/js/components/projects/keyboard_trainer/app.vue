<template>
    <div class="kbt-app">
        <kbt-header></kbt-header>
        <kbt-content></kbt-content>
        <transition name="fade" mode="out-in">
            <kbt-welcome v-if="!get_lang"></kbt-welcome>
        </transition>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

import Header from "./components/header";
import Content from "./components/content";
import Welcome from "./components/welcome"

export default {
    name: "kbt-trainer-app",

    components: {
        'kbt-header': Header,
        'kbt-welcome': Welcome,
        'kbt-content': Content,
    },

    computed: mapGetters("kbt", ['get_lang']),
    methods: {
        ...mapActions("kbt", ['stopGame']),

        beforeRouteLeave(){
            this.stopGame();
        }
    }
}
</script>

<style scoped>

</style>
