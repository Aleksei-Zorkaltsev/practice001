<template>
    <div class="todo-new-task-preview">
        <div class="todo-tasklist-task">
            <button disabled class="todo-tasklist-btn-complete-preview">
                <i class="far fa-circle"></i>
            </button>
            <div class="todo-tasklist-task-content">
                <div class="todo-new-task-preview-textarea">
                        <textarea placeholder="Кратко опишите задачу."
                                  @keydown.enter.prevent
                                  @keyup="resizeTextArea"
                                  :value="message"
                                  @input="updateMessage">
                        </textarea>
                </div>
                <div class="todo-tasklist-time">
                    <p> <span v-if="get_NewTask_flowTask">Сделать до</span>
                        <span v-else>Сделать в : </span>
                        <b>{{ get_NewTask_hour }}:{{ get_NewTask_minute }} <span v-if="get_NewTask_DateStr"></span></b>
                        <span v-if="get_NewTask_DateStr">:</span>
                        <b>
                            <span v-if="checkToday(get_NewTask_DateStr)"> Сегодня </span>
                            <span v-else> {{ get_NewTask_DateStr }} </span>
                        </b>
                    </p>
                    <p> Дата создания: <b>{{ todayDate }}</b> </p>
                </div>
            </div>
            <button class="todo-tasklist-btn-star" disabled>
                <i v-if="get_NewTask_favorite"  class="fas fa-star"></i>
                <i v-else class="far fa-star"></i>
            </button>
            <button class="todo-tasklist-btn-trash" disabled>
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "new_task_preview",

    computed: {
        ...mapGetters('todo', [
            'get_NewTask_DateStr',
            'get_NewTask_hour',
            'get_NewTask_minute',
            'get_NewTask_favorite',
            'get_NewTask_flowTask',
        ]),

        ...mapState('todo', {
            message: state => state.new_task.message,
        }),

        todayDate(){
            let day = new Date().getDate();
            let month = new Date().getMonth()+1;
            if(day < 10) day = '0' + day;
            if(month < 10) month = '0' + month;
            return `${day}.${month}.${new Date().getFullYear()}`;
        }
    },

    methods: {
        checkToday(current_date){
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth()+1;

            if(day < 10) day = '0' + day;
            if(month < 10) month = '0' + month;

            return current_date == `${day}.${month}.${date.getFullYear()}`;
        },

        resizeTextArea(){
            let block = document.querySelector('.todo-new-task-preview-textarea');
            let textarea = block.getElementsByTagName('textarea')[0];

            if(textarea.scrollHeight >= 50 && textarea.value) {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            } else {
                textarea.style.height = '25px';
            }
        },

        updateMessage(e){
            this.$store.commit('todo/UPDATE_NEW_TASK_MESSAGE', e.target.value)
        },
    }
}
</script>

<style scoped>

</style>
