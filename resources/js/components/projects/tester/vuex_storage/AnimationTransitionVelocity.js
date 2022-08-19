import Vue from "vue";

export default {
    animate_HeightQuestion(){
        Vue.nextTick(()=>{
            let question = document.querySelector('.tester-test-question');
            let question_block = document.querySelector('.tester-test-question-block');
            Velocity(question_block, { height: (45 + question.clientHeight + 10) },{ duration: 200 })
        })
    },

    animate_TransitionQuestion(){
        let block = document.querySelector('.tester-test-current-question');
        Velocity(block, { opacity: 0 } , { duration: 100 });
        Velocity(block, { opacity: 1 } , { delay: 100, duration: 100 });
    },

    animate_TransitionEnd(){
        let el = document.querySelector('.tester-test-end');
        Velocity(el, { opacity: 1 } , { delay: 200, duration: 400 });
    },

    animate_HeightBodyEnd(){
        let body = document.querySelector('.tester-test-body');
        Velocity(body, { height: 250 }, { duration: 300})
    },

    animate_CloseLastQuestion(){
        let currentQuestion = document.querySelector('.tester-test-current-question');
        Velocity(currentQuestion, { opacity: 0 },{ duration: 100 })
    },
}
