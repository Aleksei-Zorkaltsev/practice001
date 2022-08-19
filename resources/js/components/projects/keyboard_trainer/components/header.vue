<template>
    <div class="kbt-app-header">
        <div class="kbt-app-header-left">
            <button v-if="get_lang" :disabled="!get_showStartBtn" @click.prevent="unsetLang"><i class="fas fa-arrow-alt-circle-left"></i> Выбор языка</button>
        </div>
        <div class="kbt-app-header-right">
            <button @click.prevent="exit"><i class="fas fa-times"></i></button>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    name: "kbt-header",

    computed: mapGetters("kbt" ,['get_lang', 'get_showStartBtn' ]),
    methods: {
        ...mapActions("kbt" ,['stopGame', 'unsetLang']),

        exit(){
            this.stopGame()
            this.unsetLang()
            this.$router.back()
        },
    },
}
</script>

<style scoped>

</style>
