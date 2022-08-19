<template>
    <div class="tester-container tester-test-main">
        <div class="tester-test-body">
            <transition name="fade-opacity" mode="out-in">
                <div v-if="get_currentQuestion" class="tester-test-current-question">
                    <div class="tester-test-question-block">
                        <h4>Вопрос:</h4>
                        <p class="tester-test-question"> {{ get_currentQuestion.question }} </p>
                    </div>
                    <div class="tester-test-answers-block">
                        <div v-for="option in get_currentQuestion.answers"
                             @click="setUserAnswer(option.id)"
                             :key="option.id"
                             class="tester-answer-option">
                            <i class="fa-regular fa-circle"></i> <p>{{ option.value }}</p>
                            <transition name="fade">
                                <i v-if="get_user_answer === option.id"
                                   class="fas fa-check tester-answer-option-check"></i>
                            </transition>
                        </div>
                        <button :disabled="!get_user_answer || get_time_off"
                            class="tester-apply-answer-btn"
                            @click.prevent="applyAnswer"> Принять ответ </button>
                    </div>
                </div>
            </transition>
            <transition name="fade-opacity" mode="out-in">
                <button v-if="!get_currentQuestion && get_questions.length && !get_end"
                        class="tester-test-start-btn"
                        @click.prevent="startTest" > Начать тест </button>
            </transition>
            <transition name="fade-opacity" mode="out-in">
                <div class="tester-test-end" v-if="get_end">
                    <h2>Тест завершен.</h2>
                </div>
            </transition>
        </div>
        <div class="tester-test-info-block">
            <div v-if="get_end">Тест закончен, вы ответили на все вопросы.
                <br> Ваш результат:
                <br> Правильных ответов: {{ get_counter_rights_answers }}
                <br> Ошибки: {{ get_counter_mistakes }}
            </div>
            <div v-else>
                <div>
                    {{ get_timer_minutes }} : {{ get_timer_seconds }}
                    <p v-if="get_show_time_off">Время вышло.</p>
                </div>
                <div>
                    Вопрос номер: 0
                </div>
            </div>

            <button
                    @click.prevent="backToMain"
                    class="tester-app-back-btn">
                <i class="fas fa-backspace"></i> Вернуться к выбору теста
            </button>
        </div>
    </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    name: "main_test",

    computed: mapGetters('tester', [
        'get_SelectedTest',
        'get_user_answer',
        'get_counter_rights_answers',
        'get_counter_mistakes',
        'get_currentQuestion',
        'get_questions',
        'get_end',
        'get_time_off',
        'get_timer_seconds',
        'get_timer_minutes',
        'get_show_time_off',
    ]),

    methods: {
        ...mapActions('tester',[
            'initTest',
            'startTest',
            'applyAnswer',
            'resetTest',
            'setUserAnswer',
        ]),

        backToMain(){
            this.$router.push('/tester');
        },
    },

    mounted() {
        this.initTest(+this.$route.params.id)
    },

    beforeRouteLeave(to, from, next){
        this.resetTest();
        next();
    },
}
</script>

<style scoped>

</style>
