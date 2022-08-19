export default {
    SET_TESTS(state, value){
        state.tests = value;
    },
    SET_USER_ANSWER(state, value){
        state.user_answer = value;
    },
    SET_RIGHT_ANSWER(state, value){
        state.rightAnswer = value
    },
    SET_COUNTER_RIGHTS_ANSWERS(state, value){
        state.counter_rights_answers = value
    },
    SET_COUNTER_MISTAKES(state, value){
        state.counter_mistakes = value
    },
    SET_CURRENT_QUESTION(state, value){
        state.currentQuestion = value
    },
    SET_QUESTIONS(state, value){
        state.questions = value
    },
    ADD_QUESTION(state, value){
        state.questions.push(value)
    },
    DELETE_QUESTION(state, value){
        state.questions.splice(value, 1);
    },
    SET_END(state, value){
        state.end = value
    },
    SET_TIME(state, value){
        state.time = value
    },
    SET_TIME_OFF(state, value){
        state.time_off = value
    },
    SET_TIMER(state, value){
        state.timer = value
    },
    DROP_TIMER(state){
        clearInterval(state.timer)
    },

    SET_TIMER_SECOND(state, value){
        state.timer_seconds = value
    },
    SET_TIMER_MINUTE(state, value){
        state.timer_minutes = value
    },
    SET_COUNT_QUESTION(state, value){
        state.countQuestion = value
    },
    SET_SHOW_TIME_OFF(state, value){
        state.show_time_off = value
    },

    SET_SELECT_TEST(state, test){
        state.selected_test = test;
    }
}
