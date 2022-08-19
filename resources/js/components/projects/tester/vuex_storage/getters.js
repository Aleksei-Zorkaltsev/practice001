export default {
    get_SelectedTest(state){
        return state.selected_test;
    },
    get_Tests(state){
        return state.tests;
    },
    get_user_answer(state){
        return state.user_answer
    },
    get_counter_rights_answers(state){
        return state.counter_rights_answers
    },
    get_counter_mistakes(state){
        return state.counter_mistakes
    },
    get_currentQuestion(state){
        return state.currentQuestion
    },
    get_questions(state){
        return state.questions
    },
    get_end(state){
        return state.end
    },
    get_time_off(state){
        return state.time_off
    },
    get_timer_seconds(state){
        return state.timer_seconds
    },
    get_timer_minutes(state){
        return state.timer_minutes
    },
    get_show_time_off(state){
        return state.show_time_off
    },
}
