<template>
    <div class="stopwatch-timer-block" :class="{'dark-theme' : getDark}">

        <stopwatch-timer></stopwatch-timer>

        <div class="stopwatch-action-btn" :class="{'dark-theme' : getDark}">
            <button v-if="getPause" @click="startTimer" class="stopwatch-start-btn"><i class="fa-solid fa-play"></i></button>
            <button v-else @click="pauseTimer" class="stopwatch-pause-btn"><i class="fa-solid fa-pause"></i></button>
        </div>

        <button @click="saveLap"
                class="stopwatch-lap-btn"
                :class="{'stopwatch-lap-btn-active': !getPause, 'dark-theme' : getDark}"
                :disabled="getPause">
            ВРЕМЯ <i class="fa-solid fa-circle-check"></i>
        </button>
    </div>
</template>

<script>

import StopwatchTimer from "./stopwatch-timer";

import {mapGetters, mapActions} from "vuex";

export default {
    name: "stopwatch-main",

    components: {
        'stopwatch-timer': StopwatchTimer,
    },

    computed: mapGetters("stopwatch",['getPause', 'getDark', 'getMsec', 'getSec', 'getMinute', 'getHour']),
    methods: mapActions("stopwatch",['startTimer','pauseTimer', 'saveLap']),
}
</script>

<style scoped>

</style>
