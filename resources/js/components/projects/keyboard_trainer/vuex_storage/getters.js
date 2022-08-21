export default {
    get_lang(state){
        return state.lang;
    },
    get_showStartBtn(state){
        return state.showStartBtn;
    },
    get_result(state){
        return state.result;
    },
    get_game(state){
        return state.game;
    },
    get_countdownValue(state){
        return state.countdownValue;
    },
    get_positions(state){
        return state.positions
    },
    get_currentScore(state){
        return state.currentScore;
    },
    get_timerMinute(state){
        if(state.timer.minute < 10) {
            return `0${state.timer.minute}`;
        }
        return state.timer.minute;
    },
    get_timerSecond(state){
        if(state.timer.seconds < 10) {
            return `0${state.timer.seconds}`;
        }
        return state.timer.seconds;
    },

    get_countdown_counter(state){
        return state.countdownValue < 4 && state.countdownValue >= 0;
    }
}
