/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

window.Vue = require('vue').default;
require('./service/cookie')

import vuexStore from './Vue-vuex-store';
import layout from './Vue-layout';
import vueRouter from './Vue-router';

const app = new Vue({
    el: '#app',
    router: vueRouter,
    store: vuexStore,
    components: {
        'vue-layout': layout,
    },
});
