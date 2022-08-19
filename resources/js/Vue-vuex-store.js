import Vue from 'vue'
import Vuex from 'vuex'

import Stopwatch from "./components/projects/stopwatch/vuex_stopwatch";
import Kb_trainer from "./components/projects/keyboard_trainer/vuex_kb_trainer";
import Tester from "./components/projects/tester/vuex_tester";
import TodoApp from "./components/projects/todo_app/vuex_todo";

Vue.use(Vuex)

const store = new Vuex.Store({

    modules: {
        stopwatch: Stopwatch,
        kbt: Kb_trainer,
        tester: Tester,
        todo: TodoApp,
    },
})
export default store;
