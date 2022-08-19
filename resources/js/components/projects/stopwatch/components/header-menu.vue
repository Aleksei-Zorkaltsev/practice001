<template>
    <div class="stopwatch-header-menu">
        <button @click="toggleMenu" class="stopwatch-header-toggle-menu"><i class="fa-solid fa-bars"></i></button>
        <transition name="fade-sw">
            <ul v-show="show" class="stopwatch-menu">
                <li @click="lightTheme"> <i class="fa-regular fa-circle"></i> Светлая тема</li>
                <li @click="darkTheme"> <i class="fa-solid fa-circle"></i> Темная тема</li>
                <span></span><!-- декоративный уголок уголок -->
            </ul>
        </transition>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "stopwatch-header-menu",

    data(){ return {
        show: false,
    }},

    methods: {
        ...mapActions("stopwatch",['lightTheme', 'darkTheme']),

        toggleMenu(){
            this.show = !this.show;
        },
        closeMenu(e){
            if(!this.$el.contains(e.target)){
                this.show = false;
            }
        }
    },

    mounted(){
        document.addEventListener('click', this.closeMenu)
    },
    beforeDestroy () {
        document.removeEventListener('click', this.closeMenu)
    }
}
</script>

<style scoped>

</style>
