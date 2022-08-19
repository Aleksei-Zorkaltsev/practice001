<template>
    <div class="kbt-score-block">
        <div class="kbt-score-block-content">
            <div class="kbt-score">
                <h3>Счет:</h3>
                <p>{{ get_currentScore }}</p>
            </div>
            <div class="kbt-timer">
                <h3>Время:</h3>
                <div>
                    <p>{{ get_timerMinute }}</p><span> : </span><p>{{ get_timerSecond }}</p>
                </div>
            </div>
            <transition name="fade">
                <button :disabled="!get_game" @click.prevent="stopGame"> stop </button>
            </transition>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    name: "kbt-side-info-block",

    computed: mapGetters('kbt', ['get_game', 'get_currentScore', 'get_timerSecond', 'get_timerMinute']),
    methods: mapActions('kbt', ['stopGame']),
}
</script>

<style scoped>

</style>
