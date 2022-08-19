<template>
    <div>
        <task-list_header></task-list_header>
        <div class="todo-task-list">
            <div v-if="get_RenderTasks.length" class="todo-task-list__scroller">
                <task_component v-for="task in get_RenderTasks" :key="task.id" :task="task"></task_component>
            </div>
            <h4 v-else> Нет задач. </h4>
        </div>

        <router-link to="/todo/new_task" class="todo-task-list-add-task-btn"> <i class="fas fa-plus"></i> Добавить новую задачу </router-link>
    </div>
</template>
<script>

import { mapGetters } from "vuex";
import Task from "./task";
import TaskListHeader from "./task_list_header";

export default {
    name: 'todo-task-list',

    components: {
        'task_component': Task,
        'task-list_header': TaskListHeader,
    },

    computed: mapGetters('todo', ['get_RenderTasks']),
}
</script>
<style scoped>

</style>
