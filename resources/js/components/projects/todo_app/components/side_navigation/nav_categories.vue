<template>
    <div class="todo-app-categories">
        <button v-for="category in get_Categories"
                :key="category.id"
                @click.prevent="selectCategory(category)"
                class="todo-app-category">
            <i :class="`${category.icon_fontAwesome}`"></i>
            <span>{{ category.name }}</span>
        </button>

        <div class="todo-app-user-category">
            <i class="fas fa-clipboard-list"></i>
            <span>Пользовательские списки</span>
            <ul>
                <li v-for="category in get_UserCategories">
                    <button @click="selectCategory(category)"> {{ category.name }} </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "nav_categories",

    computed: mapGetters('todo', ['get_UserCategories', 'get_Categories']),
    methods: mapActions('todo', ['selectCategory'])
}
</script>

<style scoped>

</style>
