export default {
    namespaced: true,

    state: {
        dark: false,
        msec: '00',
        sec: '00',
        minute: '00',
        hour: '00',
        pause: true,
        statusTimer: false,
        lap_results: [],
    },

    getters: {
        getDark(state){
            return state.dark;
        },
        getLapResults(state){
            return state.lap_results;
        },
        getMsec(state){
            return state.msec;
        },
        getSec(state){
            return state.sec;
        },
        getMinute(state){
            return state.minute;
        },
        getHour(state){
            return state.hour;
        },
        getPause(state){
            return state.pause;
        },
    },

    actions: {
        startTimer(ctx){
            if(ctx.state.statusTimer) return;

            ctx.commit('SET_STATUS_TIMER', true)
            ctx.commit('SET_PAUSE', false)

            let counter = setInterval(()=>{
                if(!ctx.state.pause) {
                    let m_Sec = +ctx.state.msec + 1;
                    if(m_Sec === 100){
                        m_Sec = 0;
                        let second = +ctx.state.sec + 1;
                        if(second === 60){
                            second = 0;
                            let minute = +ctx.state.minute + 1
                            if(minute === 60){
                                minute = 0;
                                let hour = +ctx.state.hour + 1;
                                ctx.commit("SET_HOUR", hour) ;
                            }
                            if(minute < 10) minute = '0'+ minute;
                            ctx.commit('SET_MINUTE', minute);
                        }
                        if(second < 10) second = '0'+ second;
                        ctx.commit('SET_SEC', second);
                    }
                    if(m_Sec < 10) m_Sec = '0' +  m_Sec;
                    ctx.commit('SET_MSEC', m_Sec);
                } else {
                    clearInterval(counter)
                }
            },10)
        },

        pauseTimer(ctx){
            ctx.commit('SET_PAUSE', true)
            ctx.commit('SET_STATUS_TIMER', false)
        },

        saveLap(ctx){
            if(ctx.state.pause) return;

            ctx.commit('SAVE_LAP_RESULT', {
                lap: ctx.state.lap_results.length + 1,
                time: `${ctx.state.hour} : ${ctx.state.minute} : ${ctx.state.sec} : ${ctx.state.msec}`
            })
        },

        reset(ctx) {
            ctx.commit('SET_PAUSE', true );
            ctx.commit('SET_STATUS_TIMER', false );
            ctx.commit('SET_MSEC', '00' );
            ctx.commit('SET_SEC', '00' );
            ctx.commit('SET_MINUTE', '00' );
            ctx.commit('SET_HOUR', '00');
            ctx.commit('SET_LAP_RESULT', []);
        },

        lightTheme(ctx){
            ctx.commit('SET_DARK', false);
        },
        darkTheme(ctx){
            ctx.commit('SET_DARK', true);
        },
    },

    mutations: {
        SET_DARK(state, value){
            state.dark = value;
        },

        SET_PAUSE(state, value){
            state.pause = value;
        },

        SET_STATUS_TIMER(state, value){
            state.statusTimer = value;
        },

        SET_MSEC(state, value){
            state.msec = value;
        },

        SET_SEC(state, value){
            state.sec = value;
        },

        SET_MINUTE(state, value){
            state.minute = value;
        },

        SET_HOUR(state, value){
            state.hour = value;
        },

        SET_LAP_RESULT(state, value){
            state.lap_results = value
        },
        SAVE_LAP_RESULT(state, obj){
            state.lap_results.unshift(obj)
        }
    },
}
