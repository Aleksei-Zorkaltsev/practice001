<template>
    <div class="todo-new-task-options-date">
        <h3>Укажите Дату:</h3>
        <div class="todo-calendar">
            <div class="todo-calendar-month-year">
                <button @click.prevent="previousMonth">
                    <i class="fa-solid fa-square-caret-left"></i>
                </button>
                <p>{{ showMouthAndYear }}</p>
                <button @click.prevent="nextMonth">
                    <i class="fa-solid fa-square-caret-right"></i>
                </button>
            </div>
            <div class="todo-calendar-title-weekdays">
                <span v-for="tittle_week_day in daysOfWeek"> {{ tittle_week_day }} </span>
            </div>
            <div class="todo-calendar-days-block" >
                <div class="todo-calendar-day" v-for="(day, index) in days" :key="index">
                    <button @click.prevent="choiceDay(day)"
                            :disabled="!day.active"
                            :class="{'todo-calendar-day-today': day.today,
                              'todo-calendar-day-weekend': day.weekend && !day.today,
                              'todo-calendar-day-picked': day.picked }">
                        {{ day.day }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "todo-calendar",

    data(){
        return{
            daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вc'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],

            renderMonth: null,
            renderYear: null,
            renderDay: null,

            days: [],
        }
    },

    computed: {
        showMouthAndYear(){
            let value;
            value = `${this.months[this.renderMonth]} ${this.renderYear}`
            return value;
        }
    },

    methods: {
        initDate(){
            let date = new Date();

            this.renderMonth = date.getMonth()
            this.renderYear = date.getFullYear()
            this.renderDay = date.getDate()

            this.render(this.renderYear, this.renderMonth);
        },

        nextMonth(){
            this.days = [];
            if(this.renderMonth == 11) {
                this.renderMonth = 0;
                this.renderYear++;
            } else {
                this.renderMonth++
            }
            this.render(this.renderYear, this.renderMonth)
        },

        previousMonth(){
            this.days = [];
            if(this.renderMonth == 0) {
                this.renderMonth = 11;
                this.renderYear--;
            } else {
                this.renderMonth--
            }
            this.render(this.renderYear, this.renderMonth)
        },

        choiceDay(dayObj){
            this.days.forEach(el => el.picked = false);
            this.days.find(el => el.day === dayObj.day && el.active).picked = true;

            let day = dayObj.day;
            let month = this.renderMonth + 1;

            if(day < 10) day = '0'+ day;
            if(month < 10) month = '0'+ month;

            this.$store.commit('todo/SET_NEW_TASK_DAY', {
                day: day,
                month: month,
                year: this.renderYear,
            })
        },

        render(year, month){
            let firstDayOfMonth = new Date(year, month, 7).getDay()
            let lastDateOfMonth = new Date(year, month + 1, 0).getDate()
            let lastDayOfLastMonth;

            if(month == 0){
                lastDayOfLastMonth = new Date(year - 1, 11, 0).getDate()
            } else {
                lastDayOfLastMonth = new Date(year, month, 0).getDate();
            }

            //заполнить список/массив для рендера
            for(let i = 1; i <= lastDateOfMonth; i++){
                if(i === 1) {
                    let day = lastDayOfLastMonth - firstDayOfMonth + 1
                    for(let j = 0; j < firstDayOfMonth; j++){
                        this.days.push({
                            day: day,
                            today: false,
                            active: false,
                            weekend: false,
                            picked: false,
                        })
                        day++;
                    }
                }
                let date = new Date();
                let dateYear = date.getFullYear();
                let dateMonth = date.getMonth();


                //проверка на прошедшие даты этого месяца
                if(dateYear > this.renderYear
                    || dateYear == this.renderYear && dateMonth > this.renderMonth
                    || dateYear == this.renderYear && dateMonth == this.renderMonth && i < this.renderDay){

                    this.days.push({
                        day: i,
                        today: false,
                        active: false,
                        weekend: false,
                        picked: false,
                    });

                } else {
                    let today = false;
                    let weekend = false;

                    // Сегодня ?
                    if(dateYear == this.renderYear && dateMonth == this.renderMonth && i == this.renderDay) {
                        today = true;
                    }

                    // Выходной ?
                    let dayOfWeek = new Date(year, month, i).getDay();
                    if(dayOfWeek == 6 || dayOfWeek == 0){
                        weekend = true;
                    }

                    this.days.push({
                        day: i,
                        today: today,
                        active: true,
                        weekend: weekend,
                        picked: false,
                    })
                }
            }

            // запонить оставшиеся клетки колендаря днями следующего месяца
            let nextMouthDays = 42 - this.days.length;
            for(let j = 1; j <= nextMouthDays; j++){
                this.days.push({
                    day: j,
                    today: false,
                    active: false,
                })
            }
        }
    },
    mounted() {
        this.initDate();
    }
}
</script>

<style scoped>

</style>
