<template>
    <div class="todo-new-task-options-param">
        <h3>Параметры:</h3>
        <div>
            <input type="radio" v-model="flow_task" :value="false"> Выполнить <b>В</b> указаное время <br>
            <input type="radio" v-model="flow_task" :value="true"> Выполнить <b>ДО</b> указанного времени. <br>
            <input type="checkbox" v-model="favorite"> Важное.
        </div>
    </div>
</template>

<script>
export default {
    name: "new_task_params",
    computed: {
        favorite: {
            get (){ return this.$store.state.todo.new_task.favorite },
            set (value) { this.$store.commit('todo/UPDATE_NEW_TASK_FAVORITE', value) },
        },

        flow_task: {
            get(){ return this.$store.state.todo.new_task.flow_task },
            set(value){ this.$store.commit('todo/SET_NEW_TASK_TYPE', value) },
        },
    }
}
</script>

<style scoped>

</style>
