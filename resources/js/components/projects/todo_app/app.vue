<template>
    <div class="todo-app">
        <div v-if="get_Alert" class="todo-app-warning">
            <div class="todo-app-warning-alert-block">
                <p>{{ get_Alert.message }}</p>
                <button @click="executeAlert">Подтвердить</button>
                <button @click="cancelAlert">Отмена</button>
            </div>
        </div>
            <main-navigation v-if="get_user"></main-navigation>
        <div class="todo-app-right-side">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TaskList from './components/task_list/task_list.vue';
import MainNavigation from './components/side_navigation/navigation.vue';
import { mapActions, mapGetters } from "vuex";

export default {
    name: "app",

    components: {
        'task-list': TaskList,
        'main-navigation': MainNavigation
    },

    // Секундомер
    // Клавиатурный тренажер
    // Генератор Паролей
    // тесты
    // Голосовалка / опросник
    // Генератор турнирной сетки
    // Игру раннер
    // Игру запоминайка
    // Небольшой демонстрационный магазин Vue + vuex
    // * Конвертер
    // * Круговые часы
    // * Виджет с погодой(выбор города), курс валют
    // ** (back-end) Отправку сообщения
    // *** Игра с боевкой

    computed: mapGetters('todo', ['get_user', 'get_Alert']),
    methods: mapActions('todo', ['init', 'executeAlert', 'cancelAlert']),

    beforeMount() {
        this.init();
    },
}
</script>

<style scoped>

</style>
