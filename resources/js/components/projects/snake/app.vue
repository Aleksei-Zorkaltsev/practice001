<template>
    <div id="snake_app">
        <div class="snake_actions">
            <button id="snake_start_btn"> start </button>
            <button id="snake_restart_btn"> restart </button>

            <p> Змейка </p>

            <div class="snake_speed_options">
                <span>Скорость игры: </span>
                <button class="snake_set_speed_btn" data-speed="1">1</button>
                <button class="snake_set_speed_btn" data-speed="2">2</button>
                <button class="snake_set_speed_btn snake_speed_active" data-speed="3">3</button>
                <button class="snake_set_speed_btn" data-speed="4">4</button>
                <button class="snake_set_speed_btn" data-speed="5">5</button>
            </div>
        </div>
        <table id="snake_field"></table>
        <div>
            <p>Очки: <span id="snake_result">0</span></p>
        </div>
    </div>
</template>

<script>
import SnakeApp from "./SnakeApp";

export default {
    name: "app",

    mounted(){
        const App = new SnakeApp();
        App.init();
    }
}
</script>

<style scoped></style>
