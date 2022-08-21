import kbtAnimations from "./_velocity_animations";
import Lib_ru from "../src/lib_kbt_ru";
import Lib_eng from "../src/lib_kbt_eng";

export default {
    ...kbtAnimations,

    unsetLang(ctx){
        ctx.commit('SET_LANG', null);
    },

    selectLang(ctx, lang){
        ctx.commit('SET_LANG', lang);
    },

    startGame(ctx){
        if(ctx.state.game) return;
        ctx.commit('SET_SHOW_RESULT', false)
        ctx.commit('SET_SHOW_START_BUTTON', false)
        ctx.dispatch('initLibrary')
        ctx.commit('SET_CURRENT_SCORE', 0)
        ctx.commit('SET_RESULT_SCORE', 0)

        let countDawn = ctx.dispatch('countDown');

        countDawn.then((res)=>{
            if(ctx.state.game) return;
            ctx.commit('SET_GAME', true);
            ctx.dispatch('timerOn');
        })
    },

    timerOn(ctx){
        ctx.commit('SET_TIMER_SECOND', 59);
        if(ctx.state.timer.minute > 0 ) ctx.commit('DECREASE_TIMER_MINUTE');

        let interval = setInterval(()=>{
            ctx.commit('DECREASE_TIMER_SECOND');

            if(ctx.state.timer.seconds === -1 && ctx.state.timer.minute !== 0){
                ctx.commit('SET_TIMER_SECOND', 59);
                ctx.commit('DECREASE_TIMER_MINUTE')
            }
            if(ctx.state.timer.seconds === 0 && ctx.state.timer.minute === 0){
                ctx.commit('RESET_TIMER_COUNTER')
                ctx.dispatch('showResult');
            }
        }, 1000)

        ctx.commit('SET_TIMER_COUNTER', interval)
    },

    countDown(ctx){
        return new Promise((res, rej) => {

            ctx.commit('SET_COUNTDOWN_COUNTER', setInterval(() => {
                if(ctx.state.countdownValue === 0){
                    clearInterval(ctx.state.countdownValue);
                    return res(true);
                }
                ctx.commit('DECREASE_COUNTDOWN_VALUE')
            }, 1000))
        });
    },


    endgame(ctx){
        for(let position in ctx.state.positions) {
            if (ctx.state.positions[position].value !== null) return false;
        }
        return true;
    },


    newWord(ctx, position = null){
        //  случайный индекс в массиве
        let index = +(Math.random()*ctx.state.game_library.length).toFixed();
        //  получить корректный индекс, если toFixed округлит в большую сторону
        if(index === ctx.state.game_library.length) index = ctx.state.game_library.length - 1;

        ctx.commit('UNSET_POSITION', position)
        if(ctx.state.game_library.length > 9) {
            ctx.commit('SET_POSITION', {
                position: position,
                index: index,
            })
        }
        ctx.commit('DELETE_ELEMENT_GAME_LIBRARY', index)
    },


    initLibrary(ctx){
        ctx.commit('RESET_GAME_LIBRARY');

        switch (ctx.state.lang) {
            case 'ru':
                ctx.commit('SET_LANG_LIB', Lib_ru)
                break;
            case 'eng':
                ctx.commit('SET_LANG_LIB', Lib_eng)
                break;
        }

        for(let i = 0; i < ctx.state.lang_lib.length; i++){
            ctx.commit('PUSH_IN_GAME_LIBRARY', {
                id: i+1,
                value: ctx.state.lang_lib[i],
            });
        }

        for(let i = 1; i <= 9; i++){
            let index = +(Math.random()*ctx.state.game_library.length).toFixed();
            if(index === ctx.state.game_library.length) { index = ctx.state.game_library.length - 1 }

            ctx.commit('SET_POSITION', {
                position: `p${i}`,
                index: index,
            })

            ctx.commit('DELETE_ELEMENT_GAME_LIBRARY', index)
        }
    },

    applyValue(ctx, event) {
        if(!event.target.value) return;
        ctx.commit('SET_USER_TEXT', event.target.value)

        let right = false;

        for (let position in ctx.state.positions){
            if(ctx.state.positions[position].value === ctx.state.user_text){
                ctx.dispatch('animateSuccess', {
                    id: ctx.state.positions[position].id,
                    input: event.target
                });

                ctx.dispatch('newWord', position);
                ctx.commit('INCREASE_CURRENT_SCORE');
                ctx.commit('SET_USER_TEXT', null);

                event.target.value = null;
                right = true;
                break;
            }
        }

        if(!right){
            ctx.dispatch('setInputError', event.target)
        }

        ctx.dispatch('endgame').then((res)=>{
            if(res){
                ctx.dispatch('showResult')
            }
        })
    },

    showResult(ctx){
        ctx.commit('SET_SHOW_RESULT', true);
        ctx.commit('SET_RESULT_SCORE', ctx.state.currentScore);
        ctx.dispatch('stopGame');
    },

    resetConfig(ctx){
        ctx.commit('SET_USER_TEXT', null);
        ctx.commit('SET_COUNTDOWN_VALUE', 4);
        ctx.commit('SET_SHOW_START_BUTTON', true);
        ctx.commit('RESET_TIMER_COUNTER');
        ctx.commit('SET_TIMER_SECOND', 0);
        ctx.commit('SET_TIMER_MINUTE', 2);
        ctx.commit('UNSET_COUNTDOWN_COUNTER');
        ctx.dispatch('initLibrary');

        for(let position in ctx.state.positions){
            ctx.commit('UNSET_POSITION', position)
        }
    },

    stopGame(ctx){
        ctx.commit('SET_GAME', false)
        ctx.dispatch('resetConfig');
    }
}
