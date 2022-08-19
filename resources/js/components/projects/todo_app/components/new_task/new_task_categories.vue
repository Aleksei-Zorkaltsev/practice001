<template>
    <div class="todo-new-task-categories">
        <h3>Пользовательские категории:</h3>
        <div>
            <div v-if="get_UserCategories.length" class="todo-new-task-categories-selector"
                 @click="show_selector_user_categories = true">

                <p v-if="get_NewTask_Category.name">{{ get_NewTask_Category.name }}</p>
                <p v-else> категория не выбрана </p>
            </div>
            <div v-else class="todo-new-task-categories-selector-disable">
                <p> нет пользовательских категорий </p>
            </div>
        </div>

        <ul v-if="show_selector_user_categories">
            <li v-for="category in get_UserCategories"  @click="selectorCategoryChange(category.id)">
                {{ category.name }}
            </li>
            <li @click="selectorCategoryChange(null)">
                Без категории.
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "new_task_categories",
    data(){ return {
        show_selector_user_categories: false,
    }},

    computed: mapGetters('todo', ['get_UserCategories', 'get_NewTask_Category']),

    methods: {
        selectorCategoryChange(value){
            this.$store.commit('todo/SET_NEW_TASK_USER_CATEGORY', value)
        },
    },

    mounted() {
        document.addEventListener('click', (e) => {
            if(!e.target.closest('.todo-new-task-categories-selector')) {
                this.show_selector_user_categories = false;
            }
        });
    }
}
</script>

<style scoped>

</style>
