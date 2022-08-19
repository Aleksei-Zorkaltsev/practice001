<template>
    <div class="kbt-content-active-block">
        <transition-group name="fade" mode="out-in">

            <div :key="1" v-if="get_result.show" class="kbt-content-result">
                <h3>Ваш результат: {{ get_result.score }}</h3>
            </div>

            <button class="kbt-countdown-block-start-btn"
                    :key="2"
                    v-if="get_showStartBtn"
                    @click.prevent="startGame">

                НАЧАТЬ ТРЕНИРОВКУ

            </button>

            <div :key="3" v-if="!get_game" class="kbt-countdown-block">
                <transition name="fade" mode="out-in">
                    <div v-if="get_countdownValue === 0 && !get_game" >
                        <h5>СТАРТ!</h5>
                    </div>
                </transition>
                <transition name="fade" mode="out-in">
                    <div v-if="get_countdownValue < 4 && !get_game && get_countdownValue !== 0">
                        <h5>{{ get_countdownValue }}</h5>
                    </div>
                </transition>
            </div>

            <div :key="4" v-if="get_game" class="kbt-screen-words">
                <div v-for="(item, index) in get_positions"
                     :key="index"
                     class="kbt-needed-word">
                    <transition-group :css="false"
                                      @before-enter="beforeEnter"
                                      @enter="enter"
                                      @leave="leave">
                        <div v-if="item.id" :id="`kbt-word-block-${item.id}`" :key="item.id" class="kbt-word-block">
                            <p class="kbt-needed-word-value" :id="`kbt-text-id-${item.id}`">{{ item.value }}</p>
                            <i :id="`kbt-icon-id-${item.id}`" class="fa-solid fa-check"></i>
                        </div>
                    </transition-group>
                </div>
            </div>

        </transition-group>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "kbt-main-action-block",

    computed: mapGetters("kbt", [
        'get_showStartBtn',
        'get_result',
        'get_game',
        'get_countdownValue',
        'get_positions',
    ]),

    methods: {
        ...mapActions("kbt", [
                "startGame",
                "stopGame"
            ]
        ),

        beforeEnter: function (el) {
            el.style.opacity = 0
        },
        enter: function (el, done) {
            Velocity(el, { opacity: 1 ,height: '43px' }, { delay: 800, complete: done })
        },
        leave: function (el, done) {
            Velocity(el, { opacity: 0, height: 0 }, { complete: done })
        },
    },
}
</script>

<style scoped>

</style>
