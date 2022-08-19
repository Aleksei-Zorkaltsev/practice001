<template>
    <div class="todo-app-user-interface">
        <div class="todo-app-header">
            <i class="fas fa-circle" v-for="n in 3"></i>
            <span>Планировщик задач</span>
        </div>
        <div class="todo-app-user">
            <div class="todo-user-avatar-block">
                <i class="fas fa-user"></i>
            </div>
            <div class="todo-user-info">
                <h3>{{ get_user }}</h3>
                <button @click.prevent="logout">Выйти из профиля</button>
            </div>
        </div>
        <div class="todo-app-search">
            <input type="text" @input="searchTasks" :value="searchValue" placeholder="Поиск...">
        </div>

        <nav_categories></nav_categories>
        <nav_create_category></nav_create_category>

    </div>
</template>n
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import NavigationCategories from "./nav_categories"
import NavCreateCategory from "./nav_create_category";

export default{
    name: 'todo-main-navigation',
    components: {
        'nav_create_category' : NavCreateCategory,
        'nav_categories': NavigationCategories ,
    },

    data(){ return {
        show_create_category: false,
    }},

    computed: {
        ...mapGetters('todo', ['get_user']),
        ...mapState('todo', {
            searchValue: state => state.searchStr,
        })
    },

    methods: mapActions('todo', ['logout', 'searchTasks']),
}
</script>
<style scoped></style>
