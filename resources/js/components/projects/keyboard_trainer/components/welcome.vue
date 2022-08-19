<template>
    <div class="kbt-welcome">
        <h2>Тренажер для печати</h2>
        <div class="kbt-game-options">
            <p> Выберети язык: </p>
            <button @click.prevent="selectLang('test')">test</button>
            <button @click.prevent="selectLang('ru')">Русский</button>
            <button @click.prevent="selectLang('eng')">Английский</button>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    name: "kbt-welcome",

    computed: mapGetters("kbt", ['get_lang']),
    methods: mapActions("kbt", ['selectLang']),
}
</script>

<style scoped>

</style>
