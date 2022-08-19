<template>
    <div class="stopwatch-header">
        <stopwatch-header-menu></stopwatch-header-menu>
        <div>
            <button @click.prevent="reset"><i class="fa-solid fa-arrow-rotate-left"></i></button>
            <button @click.prevent="back"><i class="fas fa-times"></i></button>
        </div>
    </div>
</template>

<script>

import headerMenu from "./header-menu";

import { mapActions } from 'vuex'

export default {
    name: "stopwatch-header",

    methods: {
        ...mapActions("stopwatch",['reset']),

        back() {
            this.$router.back()
        },
    },
    components: {
        'stopwatch-header-menu': headerMenu
    }
}
</script>

<style scoped>

</style>
