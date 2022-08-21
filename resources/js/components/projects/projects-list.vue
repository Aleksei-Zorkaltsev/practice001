<template>
    <div class="projects-list">
        <router-link v-for="project in projects_links" :to="project.link">
            <div class="projects-list-item">
                <i :class="project.font_awesome_icon"></i>
                <p>{{ project.title }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "projects-list",

    data(){
        return{
            projects_links: [
                {
                    title: 'TODO APP',
                    font_awesome_icon: 'fas fa-clipboard-check',
                    link: '/todo'
                },
                {
                    title: 'Секундомер',
                    font_awesome_icon: 'fa-solid fa-clock',
                    link: '/stopwatch'
                },
                {
                    title: 'Тренажер для печати',
                    font_awesome_icon: 'fas fa-keyboard',
                    link: '/kb_trainer'
                },
                {
                    title: 'Генератор паролей',
                    font_awesome_icon: 'fas fa-key',
                    link: '/pass_generator'
                },
                {
                    title: 'Memory Game',
                    font_awesome_icon: 'fas fa-trophy',
                    link: '/memory_game'
                },
                {
                    title: 'Тесты',
                    font_awesome_icon: 'fas fa-question-circle',
                    link: '/tester'
                },
                {
                    title: 'Змейка. Vanilla Js ES6',
                    font_awesome_icon: 'fa-solid fa-staff-snake',
                    link: '/snake'
                },
            ]
        }
    }
}
</script>

<style scoped>

</style>
