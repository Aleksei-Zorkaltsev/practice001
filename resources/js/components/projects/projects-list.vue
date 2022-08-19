<template>
    <div class="projects-list">
        <router-link to="/todo">
            <div class="projects-list-item">
                <i class="fas fa-clipboard-check"></i>
                <p>TODO APP</p>
            </div>
        </router-link>
        <router-link to="/stopwatch">
            <div class="projects-list-item">
                <i class="fa-solid fa-clock"></i>
                <p>Секундомер</p>
            </div>
        </router-link>
        <router-link to="/kb_trainer">
            <div class="projects-list-item">
                <i class="fas fa-keyboard"></i>
                <p>Тренажер для печати</p>
            </div>
        </router-link>
        <router-link to="/pass_generator">
            <div class="projects-list-item">
                <i class="fas fa-key"></i>
                <p>Генератор паролей</p>
            </div>
        </router-link>
        <router-link to="/memory_game">
            <div class="projects-list-item">
                <i class="fas fa-trophy"></i>
                <p>Memory Game</p>
            </div>
        </router-link>
        <router-link to="/tester">
            <div class="projects-list-item">
                <i class="fas fa-question-circle"></i>
                <p>Тесты</p>
            </div>
        </router-link>
        <router-link to="/snake">
            <div class="projects-list-item">
                <i class="fa-solid fa-staff-snake"></i>
                <p> Змейка. Vanilla Js ES6 </p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "projects-list",
}
</script>

<style scoped>

</style>
