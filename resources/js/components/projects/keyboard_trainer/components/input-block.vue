<template>
    <div class="kbt-input-area">
        <div class="kbt-input-block">
            <input
                placeholder="введите текст"
                class="kbt-input"
                @keydown.enter="applyValue($event)"
                :disabled="!get_game">
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
    name: "kbt-input-block",

    computed: mapGetters('kbt' , ['get_game']),
    methods: mapActions('kbt' , ['applyValue'])
}
</script>

<style scoped>

</style>
