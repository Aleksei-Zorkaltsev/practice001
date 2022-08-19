import AnimationTransition from "./AnimationTransitionVelocity";
import DefaultTests from "../src/tests_list";

import Vue from "vue";
import VueRouter from "../../../../Vue-router";


export default {
    ...AnimationTransition,



    initStorage(ctx){
        let storage = JSON.parse(localStorage.getItem('tester_storage'));
        if(storage){
            ctx.commit('SET_TESTS', storage.tests )
        } else {
            let storageJson = {
                tests: DefaultTests,
                counter_tests_id: 99,
            }
            localStorage.setItem('tester_storage', JSON.stringify(storageJson))
            ctx.commit('SET_TESTS', DefaultTests )
        }
    },


    resetTest(ctx){
        ctx.commit('SET_USER_ANSWER', null);
        ctx.commit('SET_RIGHT_ANSWER', null);
        ctx.commit('SET_COUNTER_RIGHTS_ANSWERS', 0);
        ctx.commit('SET_COUNTER_MISTAKES', 0);
        ctx.commit('SET_CURRENT_QUESTION', null);
        ctx.commit('SET_QUESTIONS', []);
        ctx.commit('SET_END', false);
        ctx.commit('SET_TIME_OFF', false);
        clearInterval(ctx.state.timer)
        ctx.commit('SET_TIMER_SECOND', null);
        ctx.commit('SET_TIMER_MINUTE', null);
        ctx.commit('SET_COUNT_QUESTION', 9);
        ctx.commit('SET_SHOW_TIME_OFF', false);
    },

    selectTest(ctx, test){
        ctx.commit('SET_SELECT_TEST', test);
    },

    startTest(ctx){
        ctx.dispatch('nextQuestion')
        ctx.dispatch('timerStart')
    },

    timerStart(ctx){
        let timer = setInterval(()=>{
            ctx.commit('SET_TIMER_SECOND', (ctx.state.timer_seconds - 1))

            if(ctx.state.timer_minutes == '00' && ctx.state.timer_seconds === 0){
                ctx.dispatch('stopTest');
                ctx.commit('SET_SHOW_TIME_OFF', true)
            }
            if(ctx.state.timer_seconds === 0 && ctx.state.timer_minutes != 0) {
                ctx.commit('SET_TIMER_SECOND', 59);
                ctx.commit('SET_TIMER_MINUTE', (ctx.state.timer_minutes - 1));
            }
            ctx.dispatch('fixTimer')
        }, 1000)

        ctx.commit('SET_TIMER', timer)
    },

    stopTest(ctx){
        ctx.commit('DROP_TIMER')
        ctx.commit('SET_TIME_OFF', true)
    },

    fixTimer(ctx){
        if(ctx.state.timer_minutes < 10){
            ctx.commit('SET_TIMER_MINUTE', ctx.state.timer_minutes.toString())
            let value = /0\d/;
            if(!value.test(ctx.state.timer_minutes)){
                ctx.commit('SET_TIMER_MINUTE', ('0' + ctx.state.timer_minutes))
            }
        }
        if(ctx.state.timer_seconds < 10){
            ctx.commit('SET_TIMER_SECOND', ctx.state.timer_seconds.toString())
            ctx.state.timer_seconds = ctx.state.timer_seconds.toString()
            let value = /0\d/;
            if(!value.test(ctx.state.timer_seconds)){
                ctx.commit('SET_TIMER_SECOND', ('0' + ctx.state.timer_seconds))
            }
        }
    },

    checkAnswer(ctx){
        if(ctx.state.user_answer === ctx.state.rightAnswer) {
            ctx.commit('SET_COUNTER_RIGHTS_ANSWERS', (ctx.state.counter_rights_answers + 1))
        } else {
            ctx.commit('SET_COUNTER_MISTAKES', (ctx.state.counter_mistakes + 1))
        }
        //ctx.dispatch('animate_CheckAnswer');
    },

    applyAnswer(ctx){
        ctx.dispatch('checkAnswer')
        ctx.commit('SET_USER_ANSWER', null)

        if(ctx.state.questions.length) {
            ctx.dispatch('nextQuestion');
        } else {
            ctx.dispatch('endTest');
        }
    },

    endTest(ctx){
        ctx.dispatch('animate_CloseLastQuestion')

        setTimeout(()=>{
            ctx.commit('SET_CURRENT_QUESTION', null)
        },100);

        ctx.dispatch('animate_HeightBodyEnd');

        ctx.commit('SET_END', true)
        ctx.commit('DROP_TIMER')

        //!!!!!!!!!!!

        Vue.nextTick(()=>{
            ctx.dispatch('animate_TransitionEnd');
        })
    },

    nextQuestion(ctx){
        let random_index  = +(Math.random()*ctx.state.questions.length).toFixed();
        if (random_index === ctx.state.questions.length) random_index--;

        ctx.dispatch('animate_TransitionQuestion');

        setTimeout(()=>{
            ctx.commit('SET_CURRENT_QUESTION', ctx.state.questions[random_index])
            ctx.commit('DELETE_QUESTION', random_index)
            let rightAnswer = ctx.state.currentQuestion.answers.find(el => el.answer)
            ctx.commit('SET_RIGHT_ANSWER', rightAnswer.id);

            ctx.dispatch('animate_HeightQuestion');
        }, 100)
    },

    initTime(ctx,time){
        ctx.commit('SET_TIME', time)
        ctx.commit('SET_TIMER_MINUTE', +Math.floor(ctx.state.time / 60))
        ctx.commit('SET_TIMER_SECOND', ctx.state.time % 60)
        ctx.dispatch('fixTimer')
    },

    initTest(ctx, route_id){
        ctx.dispatch('resetTest');
        if(!ctx.state.tests) {
            VueRouter.push('/tester');
            return;
        }

        let test = ctx.state.tests.find((el) => {
            if(el.id === route_id){
                ctx.dispatch('initTime', el.time)
                return true;
            }
        });
        test.questions.forEach((question)=>{
            ctx.commit('ADD_QUESTION', question)
        })
    },

    setUserAnswer(ctx, id){
        ctx.commit('SET_USER_ANSWER', id)
    }
}
