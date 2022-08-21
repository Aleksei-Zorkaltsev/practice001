<template>
    <div class="tester-container tester-create-main">

        <div class="tester-create-questions-block">
            <h3>Вопросы</h3>
            <div v-for="( questionObj , index ) in new_test.questions" class="tester-create-question">

                <h4>Вопрос: {{ index + 1 }}</h4>
                <hr>
                <textarea placeholder="Введите вопрос..." v-model="questionObj.question"></textarea>

                <div class="tester-create-test-answers-block">
                    <div v-for="option in questionObj.answers" class="tester-answer-option" >
                        <i @click="set_QuestionRightAnswer( questionObj , option )" class="fa-regular fa-circle"></i>
                        <i v-if="option.answer" class="fas fa-check tester-answer-option-check"></i>
                        <input v-model="option.value" type="text" placeholder="введите вариант ответа">
                    </div>
                </div>

                <textarea placeholder="Развернутый ответ..." v-model="questionObj.right_answer"></textarea>
            </div>

            <button @click.prevent="create_addNewQuestion" class="tester-create-question-btn">добавить вопрос</button>
        </div>

        <div class="tester-create-main-info">
            <div>
                <i @mouseover="show_title_tooltip = true"
                   @mouseout="show_title_tooltip = false"
                   class="fa-solid fa-circle-question"></i>

                    <span class="tester-create-tooltip-title" v-show="show_title_tooltip">
                        Название должно содержать не менее 5 и не более 127 символов.
                    </span>

                <h3>* Название теста:</h3>
                <input v-model="new_test.title" type="text">
                <hr>
            </div>

            <div>
                <h3>Описание:</h3>
                <textarea v-model="new_test.description"></textarea>
                <hr>
            </div>

            <div>
                <i @mouseover="show_timer_tooltip = true"
                   @mouseout="show_timer_tooltip = false"
                   class="fa-solid fa-circle-question"></i>

                <span v-show="show_timer_tooltip">Время указано в секундах.</span>

                <h3>Время на выполнение:</h3>
                <input v-model="new_test.time" type="number" min="60">
                <hr>
            </div>

            <p class="tester-create-main-info-warning" v-if="warning_validation">
                ошибка. проверьте все ли поля со звездочкой заполнены. проверьте вопросы и варианты ответа.
            </p>
            <button @click.prevent="createNewTest" class="tester-create-new-test-btn"> createNewTest </button>
        </div>

    </div>
</template>

<script>
export default {
    name: "create_test",

    data() { return {
        new_test: {
            id: null,
            title:  null,
            description: null,
            time: 60,
            questions: [],
        },
        show_timer_tooltip: false,
        show_title_tooltip: false,

        warning_validation: false,
    }},

    methods: {

        set_QuestionRightAnswer(question, option){
            question.answers.forEach(el => { el.answer = false })
            option.answer = true;
        },

        create_addNewQuestion(){
            this.new_test.questions.push({
                id: null,
                question: null,
                answers: [
                    {
                        id: 1,
                        value: null,
                        answer: true,
                    },
                    {
                        id: 2,
                        value: null,
                        answer: false,
                    },
                    {
                        id: 3,
                        value: null,
                        answer: false,
                    },
                    {
                        id: 4,
                        value: null,
                        answer: false,
                    },
                ],
                right_answer: null,
            })
        },

        validation(){
            // простая проверка.
            const storage = JSON.parse(localStorage.getItem('tester_storage'));

            if(!this.new_test.title || this.new_test.title.length > 127 || this.new_test.title.length < 5) return false;
            if(storage.tests.find(el => el.title == this.new_test.title)) return false;
            if(!this.new_test.time || this.new_test.time < 60) return false;
            this.new_test.questions.forEach(quest => {
                if(quest.answers.find(el => !el.value)) return false;
            })

            return true;
        },

        resetForm(){
            this.new_test = {
                id: null,
                title:  null,
                description: null,
                time: null,
                questions: [],
            }
        },

        createNewTest(){
            if(this.validation()){
                this.warning_validation = false;
                const storage = JSON.parse(localStorage.getItem('tester_storage'));

                storage.counter_tests_id++;
                this.new_test.id = storage.counter_tests_id;
                storage.tests.push(this.new_test)

                localStorage.setItem('tester_storage', JSON.stringify(storage))
                this.resetForm()

                this.$router.push('/tester');
            } else {
                this.warning_validation = true;
            }
        }
    },

    mounted(){
        for(let i = 1; i <= 3; i++){
            this.create_addNewQuestion()
        }
    }
}
</script>

<style scoped>

</style>
