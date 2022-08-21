import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from "./components/home"
import About_me from "./components/about-me"
import Projects from "./components/projects/main"
import Contacts from "./components/contacts"

import StopWatch from "./components/projects/stopwatch/app"
import KBTrainer from "./components/projects/keyboard_trainer/app"
import PassGenApp from "./components/projects/pass_generator/app"
import MemoryGame from "./components/projects/memory_game/app"

import Tester_app from  "./components/projects/tester/app"
import Tester_select from  "./components/projects/tester/components/home"
import Tester_Test from "./components/projects/tester/components/testing"
import Create_Test from "./components/projects/tester/components/create_test"

import TodoApp from "./components/projects/todo_app/app"
import TodoTaskList from "./components/projects/todo_app/components/task_list/task_list"
import TodoNewTask from "./components/projects/todo_app/components/new_task/new_task"
import TodoAuth from "./components/projects/todo_app/components/auth"

import Snake from "./components/projects/snake/app"

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/about_me",
        component: About_me
    },
    {
        path: "/contacts",
        component: Contacts
    },
    {
        path: "/projects",
        component: Projects,
    },
    {
        path: "/todo",
        component: TodoApp,
        children:[
            {
                path: '/',
                component: TodoTaskList,
            },
            {
                path: "auth",
                component: TodoAuth,
            },
            {
                path: "new_task",
                component: TodoNewTask,
            }
        ],
    },
    {
        path: "/stopwatch",
        component: StopWatch,
    },
    {
        path: "/kb_trainer",
        component: KBTrainer,
    },
    {
        path: "/pass_generator",
        component: PassGenApp,
    },
    {
        path: "/memory_game",
        component: MemoryGame,
    },
    {
        path: "/tester",
        component: Tester_app,
        children: [
            {
                path: '/',
                component: Tester_select,
            },
            {
                path: '/tester/test/:id',
                component: Tester_Test,
            },
            {
                path: '/tester/create',
                component: Create_Test,
            }
        ]
    },
    {
        path: "/snake",
        component: Snake,
    },


]

const router = new VueRouter({
    mode: "history",
    routes: routes,
})

export default router;
