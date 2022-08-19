<template>
    <div class="todo-tasklist-task">

        <button class="todo-tasklist-btn-complete"
                :disabled="task.complete || task.time_off"
                @click.prevent="taskComplete(task)">
            <i v-if="task.complete" class="fa-solid fa-circle-check"></i>
            <i v-else-if="task.time_off" class="fa-solid fa-circle-xmark"></i>
            <i v-else class="far fa-circle"></i>
        </button>

        <div class="todo-tasklist-task-content">
            <p class="todo-tasklist-value">{{task.message}}</p>
        </div>

        <button v-show="!task.complete && !task.time_off"
                class="todo-tasklist-btn-star"
                @click.prevent="taskFavorite(task)">
            <i v-if="task.favorite" class="fas fa-star"></i>
            <i v-else class="far fa-star"></i>
        </button>

        <button class="todo-tasklist-btn-trash"
                @click.prevent="alert_remove({
                                message: `Вы действительно хотите удалить задачу: ${task.message}.`,
                                method: 'delete_task',
                                payload: task,
                            })">
            <i class="fa-solid fa-trash-can"></i>
            <span>Удалить задачу</span>
        </button>

        <div class="todo-tasklist-time">
            <p>
                <span v-if="task.flow_task">Сделать до</span>
                <span v-else>Сделать в : </span>
                <b>{{ task.to_time.hour }}:{{ task.to_time.minute }} /
                    <span v-if="today(task.to_date)"> Сегодня </span>
                    <span v-else>
                        {{ `${task.to_date.day}.${task.to_date.month}.${task.to_date.year}` }}
                    </span>
                </b>
            </p>
            <p> Дата создания: <b>{{ task.create_date }}</b> </p>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "task",
    props: ['task'],

    methods: {
        ... mapActions('todo', ['alert_remove', 'taskFavorite', 'taskComplete']),

        today(taskDate){
            let day = `${taskDate.day}.${taskDate.month}.${taskDate.year}`;
            if(this.$store.state.todo.today == day) return true;
        },
    }
}
</script>

<style scoped>

</style>
