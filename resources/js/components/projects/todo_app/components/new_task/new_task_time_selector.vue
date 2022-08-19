<template>
    <div class="todo-new-task-options-time">
        <div>
            <h3>Время:</h3>
            <div class="todo-new-task-options-time-buttons">
                <div>
                    <button @click.prevent="change_time_newTask(['hour', 'up'])"><i class="fas fa-angle-double-up"></i></button>
                    <p>{{ get_NewTask_hour }}</p>
                    <button @click.prevent="change_time_newTask(['hour', 'dawn'])"><i class="fas fa-angle-double-down"></i></button>
                </div>
                <div>:</div>
                <div>
                    <button @click.prevent="change_time_newTask(['minute', 'up'])"><i class="fas fa-angle-double-up"></i></button>
                    <p>{{ get_NewTask_minute }}</p>
                    <button @click.prevent="change_time_newTask(['minute', 'dawn'])"><i class="fas fa-angle-double-down"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "new_task_time_selector",

    computed: mapGetters('todo', [
        'get_NewTask_minute',
        'get_NewTask_hour',
    ]),
    methods: mapActions('todo', [
        'change_time_newTask'
    ])
}
</script>

<style scoped>

</style>
