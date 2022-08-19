<template>
    <div class="stopwatch-results-block">
<!--        <div class="stopwatch-results-coverlist-top" :class="{'dark-theme' : getDark}"></div>-->

            <div class="stopwatch-results">
                <transition-group
                    v-bind:css="false"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:leave="leave">
                    <div v-for="result in getLapResults" :key="result.lap" class="stopwatch-results-item" :class="{'dark-theme' : getDark}">
                        <p><span>Круг: {{ result.lap }}</span><span>{{ result.time }}</span></p>
                    </div>
                </transition-group>
            </div>

<!--        <div class="stopwatch-results-coverlist-bottom" :class="{'dark-theme' : getDark}"></div>-->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "stopwatch-laps",

    computed: mapGetters("stopwatch",['getDark', "getLapResults"]),

    methods: {
        animateShowLapList(){
            let list = document.querySelector('.stopwatch-results-block');
            Velocity(list, {paddingTop: '170px'}, {duration: 300})
        },
        animateHiddenLapList(){
            let list = document.querySelector('.stopwatch-results-block');
            Velocity(list, {paddingTop: '115px'}, {duration: 300})
        },

        beforeEnter: function (el) {
            if(this.getLapResults.length === 1) this.animateShowLapList();
            el.style.opacity = 0 ;
            el.style.height = 0
        },
        enter: function (el, done) { Velocity(el, { opacity: 1, height: '46px' }, { complete: done })},
        leave: function (el, done) {
            if(this.getLapResults.length === 0) this.animateHiddenLapList();
            Velocity(el, { opacity: 0, height: 0 }, { complete: done })
        }
    }
}
</script>

<style scoped>

</style>
