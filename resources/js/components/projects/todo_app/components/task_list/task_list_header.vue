<template>
    <div class="todo-task-list-header">
        <h2> {{ get_CategoryName }} </h2>
        <button v-if="get_CategoryId > 99" @click.prevent="alert_remove({
                    message: `Вы действительно хотите удалить категорию ${get_CategoryName}?
                        Все связанные задачи так же  будут удаленны.`,
                    method: 'delete_category',
                    payload: get_CategoryId,
                })"> <i class="fa-solid fa-trash-can"></i> удалить категорию
        </button>
        <button
            :disabled="!get_RenderTasks.length"
            v-else-if="get_CategoryId === 4"
            @click.prevent="alert_remove({
                    message: 'Вы действительно хотите удалить все завершенные задачи?',
                    method: 'clear_completed',
                    payload: null,
                })">
            <i class="fa-solid fa-trash-can"></i> удалить завершеннные
        </button>
        <button :disabled="!get_RenderTasks.length"
                v-else-if="get_CategoryId === 5"
                @click.prevent="alert_remove({
                    message: 'Вы действительно хотите удалить все просроченные задачи?',
                    method: 'clear_time_off',
                    payload: null,
                })">
            <i class="fa-solid fa-trash-can"></i> удалить просроченные
        </button>
    </div>
</template>

<script>
import { mapActions, mapGetters} from "vuex";

export default {
    name: "task-list-header",

    computed: mapGetters('todo', [
        'get_RenderTasks',
        'get_CategoryId',
        'get_CategoryName'
    ]),
    methods: mapActions('todo', ['alert_remove']),
}
</script>

<style scoped>

</style>
