<template>
<div class="about-me">
    <div class="about-slider">
        <transition name="fade">
            <div v-if="currentSlide !== 1" class="about-slider-arrow-left" @click="swapRight()" key="arrowRight">
                <i class="fa-solid fa-angle-left"></i>
            </div>
        </transition>

        <transition-group :name="swapSide">
            <div class="about-slider-slide"
                 v-for="slide in slides"
                 v-if="currentSlide === slide.id"
                 :key="slide.id">
                <div class="about-slider-content" v-html="slide.template"></div>
            </div>
        </transition-group>

        <transition name="fade">
            <div v-if="currentSlide !== lastSlides" class="about-slider-arrow-right" @click="swapLeft()" key="swapLeft">
                <i class="fa-solid fa-angle-right"></i>
            </div>
        </transition>
    </div>
</div>
</template>
<script>
import Slides from './about_me_slides_templates'

export default {
    name: "about-me-components",
    data(){
        return{
            currentSlide: null,
            lastSlides: null,
            swapSide: 'swap-left',
            slides: Slides,
        }
    },


    methods: {
        initSlider(){
            this.currentSlide = 1;
            this.lastSlides = this.slides.length;
        },

        swapLeft(){
            this.swapSide = 'swap-left';
            this.currentSlide++;
            if(this.currentSlide > this.lastSlides) this.currentSlide = this.lastSlides;
        },
        swapRight(){
            this.swapSide = 'swap-right';
            this.currentSlide--;
            if(this.currentSlide < 0) this.currentSlide = 1;
        },
    },

    mounted() {
        this.initSlider();
    }
}
</script>

<style scoped>

</style>
