<template>
<div class="about-me">
    <div class="about-slider">
        <transition name="fade">
            <div v-if="currentSlide !== 1" class="about-slider-arrow-left" @click="swapRight()" key="arrowRight">
                <i class="fa-solid fa-angle-left"></i>
            </div>
        </transition>

        <transition-group :name="swapSide">
            <!--    slide 1    -->
            <div class="about-slider-slide"  v-if="currentSlide === 1" key="slide1">
                <div class="about-slider-content">
                    <h2>ОБО МНЕ</h2>
                    <p> Привет, меня зовут Алексей, мне 30 лет. Если говорить о себе, я не могу не начать рассказ с того,
                        что в 20 лет я получил перелом шейных позвонков, и с тех пор я в инвалидном кресле. Реабилитация проходила
                        сложно и долго. Прошло много времени прежде чем я смог "более менее" вернуться к нормальной жизни.
                        Несмотря на то, что я все еще не могу ходить и самостоятельно выходить из дома,
                        я не опускаю руки.</p>
                    <p> Безделье меня убивало, и я начал искать то, чему смогу себя посвятить даже находясь в таком положении.
                        Я всю свою жизнь любил все, что касается компьютеров, игр, и мне всегда было интересно наблюдать за
                        развитием технологий. Меня превлекала идея интрерактивности человека с "железом". По какой-то причине, я думал, что программирование - это для избранных, думал,
                        что оно слишком сложное, чтобы уже пытаться. Заблуждался, что для этого необходимо
                        окончить университет и т.д.</p>
                    <p> В какой-то момент я решил, что я ничего не потеряю, если попытаюсь. Вероятно, это было лучшее решение в моей жизни.
                        С тех пор я хочу связать свою жизнь с IT,
                        развиваться, найти себя и "<span>встать на ноги</span>" не только буквально.</p>
                </div>
            </div>

            <!--    slide 2    -->
            <div class="about-slider-slide" v-if="currentSlide === 2" key="slide2">
                <div class="about-slider-content">
                    <h2>ТЕХНИЧЕСКИЕ ЗНАНИЯ</h2>
                    <p>test text</p>
                </div>
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
export default {
    name: "about-me-components",
    data(){
        return{
            currentSlide: 1,
            lastSlides: 2,

            swapSide: 'swap-left',
        }
    },
    methods: {
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
    }
}
</script>

<style scoped>

</style>
