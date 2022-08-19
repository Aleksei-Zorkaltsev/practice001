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
            </div>

            <button @click.prevent="create_addNewQuestion" class="tester-create-question-btn">добавить вопрос</button>
        </div>

        <div class="tester-create-main-info">
            <h5>Название теста:</h5>
            <input v-model="new_test.title" type="text">
            <hr>
            <h5>Описание:</h5>
            <textarea v-model="new_test.description"></textarea>
            <hr>
            <h5>Время на выполнение:</h5>
            <input v-model="new_test.time" type="number"> <span>*Секунды</span>
            <button @click.prevent="createNewTest" class="tester-create-new-test-btn"> createNewTest </button>
        </div>

    </div>
</template>

<script>
export default {
    name: "create_test",

    data(){ return {
        new_test: {
            id: null,
            title:  null,
            description: null,
            time: 60,
            questions: [],
        },
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
            const storage = JSON.parse(localStorage.getItem('tester_storage'));

            // простые проверки
            if(this.new_test.title){
                if(this.new_test.title.length > 123 || this.new_test.title.length < 5) return false;
                if(storage.tests.find(el => el.title == this.new_test.title)) return false;
            } else { return false }

            if(!this.new_test.time || this.new_test.time < 60) return false;

            if(this.new_test.questions.length < 3) return false;
            if(this.new_test.questions.find(el => !el.question)) return false;
            if(this.new_test.questions.find(quest => quest.answers.find(el => !el.value))) return false;
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

                const storage = JSON.parse(localStorage.getItem('tester_storage'));

                storage.counter_tests_id++;
                this.new_test.id = storage.counter_tests_id;
                storage.tests.push(this.new_test)

                localStorage.setItem('tester_storage', JSON.stringify(storage))

                this.resetForm()
            }
        }
    }
}
</script>

<style scoped>

</style>
