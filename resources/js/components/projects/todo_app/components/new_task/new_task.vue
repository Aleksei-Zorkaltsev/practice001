<template>
    <div class="todo-new-task-main">
        <h5>Превью: </h5>
        <new_task_preview></new_task_preview>
        <div class="todo-new-task-options">
            <new_task_calendar></new_task_calendar>
            <new_task_time_selector></new_task_time_selector>
            <new_task_params></new_task_params>
            <button class="todo-new-task-btn-add" @click.prevent="createNewTask"> + добавить задачу</button>
            <new_task_categories></new_task_categories>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import NewTaskCalendar from "./new_task_сalendar"
import NewTaskPreview from "./new_task_preview";
import NewTaskTimeSelector from "./new_task_time_selector";
import NewTaskParams from "./new_task_params";
import NewTaskCategories from "./new_task_categories";


export default {
    name: 'todo-new-task',

    components: {
        'new_task_categories': NewTaskCategories,
        'new_task_params': NewTaskParams,
        'new_task_preview': NewTaskPreview,
        'new_task_calendar': NewTaskCalendar,
        'new_task_time_selector': NewTaskTimeSelector,
    },
    methods:{
        ...mapActions('todo' , ['createNewTask']),

        init(){
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;

            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;

            let current_hour = date.getHours();
            if(current_hour < 10) current_hour = '0' + current_hour;

            this.$store.commit('todo/SET_NEW_TASK_TIME_HOUR', current_hour + 1)
            this.$store.commit('todo/SET_NEW_TASK_TIME_MINUTE', '00')
            this.$store.commit('todo/SET_NEW_TASK_DAY', {
                day: day,
                month: month,
                year: date.getFullYear(),
            })
        },
    },

    mounted(){
        this.init();
    }
}
</script>
<style scoped></style>
