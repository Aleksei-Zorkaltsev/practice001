<template>
    <div class="stopwatch" :class="{'dark-theme' : getDark}">
        <div class="stopwatch-body" :class="{'dark-theme' : getDark}">
            <stopwatch-header></stopwatch-header>
            <stopwatch-main></stopwatch-main>
            <stopwatch-laps></stopwatch-laps>
        </div>
    </div>
</template>

<script>

import Header from "./components/header";
import Stopwatch from "./components/stopwatch";
import StopwatchLaps from "./components/stopwatch-laps";

import { mapGetters, mapActions } from 'vuex'

export default {
    name: "stopwatch-app",

    computed: mapGetters("stopwatch",['getDark']),
    methods: {
        ...mapActions("stopwatch",['reset']),
    },

    components: {
        'stopwatch-header' : Header,
        'stopwatch-main' : Stopwatch,
        'stopwatch-laps' : StopwatchLaps,
    },

    beforeRouteLeave(to, from, next){
        this.reset();
        next()
    },

}
</script>

<style scoped>

</style>
