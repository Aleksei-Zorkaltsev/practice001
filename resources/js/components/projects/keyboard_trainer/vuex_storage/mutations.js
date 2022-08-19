export default {
    SET_LANG(state, value){
        state.lang = value
    },

    SET_LANG_LIB(state, value){
        state.lang_lib = value
    },

    RESET_LANG_LIB(state){
        state.lang_lib = null
    },

    RESET_GAME_LIBRARY(state){
        state.game_library = []
    },

    PUSH_IN_GAME_LIBRARY(state, value){
        state.game_library.push(value)
    },

    DELETE_ELEMENT_GAME_LIBRARY(state, value){
        state.game_library.splice(value, 1);
    },

    SET_POSITION(state, obj){
        state.positions[obj.position] = state.game_library[obj.index];
    },

    UNSET_POSITION(state, position){
        state.positions[position].id = null;
        state.positions[position].value = null;
    },

    SET_GAME(state, value){
        state.game = value;
    },

    SET_SHOW_START_BUTTON(state, value){
        state.showStartBtn = value;
    },

    SET_COUNTDOWN_VALUE(state, value){
        state.countdownValue = value;
    },

    SET_CURRENT_SCORE(state, value){
        state.currentScore = value;
    },

    INCREASE_CURRENT_SCORE(state){
        state.currentScore = state.currentScore + 1;
    },

    SET_COUNTDOWN_COUNTER(state, interval){
        state.countdownCounter = interval;
    },

    UNSET_COUNTDOWN_COUNTER(state){
        if(state.countdownCounter) clearInterval(state.countdownCounter);
    },

    DECREASE_COUNTDOWN_VALUE(state){
        state.countdownValue = state.countdownValue - 1;
    },

    SET_SHOW_RESULT(state, value){
        state.result.show = value;
    },

    SET_RESULT_SCORE(state, value){
        state.result.score = value;
    },

    SET_TIMER_COUNTER(state, value){
        state.timerCounter = value;
    },

    RESET_TIMER_COUNTER(state){
        clearInterval(state.timerCounter)
    },

    SET_TIMER_MINUTE(state, value){
        state.timer.minute = value
    },

    SET_TIMER_SECOND(state, value){
        state.timer.seconds = value;
    },

    DECREASE_TIMER_MINUTE(state){
        state.timer.minute = state.timer.minute - 1;
    },

    DECREASE_TIMER_SECOND(state){
        state.timer.seconds = state.timer.seconds - 1;
    },

    SET_USER_TEXT(state, value){
        state.user_text = value
    },
}
