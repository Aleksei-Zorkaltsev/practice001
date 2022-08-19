import SnakeRender from "./Render";
import Snake from "./Snake";
import Food from "./Food";

export default class SnakeApp{
    constructor() {
        this.game_speed = 200;
        this.renderer = new SnakeRender();
        this.snake = new Snake();
        this.food = new Food();

        this.game = false;
        this.step = null;
    }

    init(){
        this.renderer.renderField();
        this.food.newFood(this.snake)
        this.renderer.render(this.snake, this.food)

        document.getElementById('snake_start_btn')
            .addEventListener('click', () => {
                this.startGame()
        })
        document.getElementById('snake_restart_btn')
            .addEventListener('click', () => {
                this.restart()
        })

        let speed_buttons = document.querySelectorAll('.snake_set_speed_btn');
        speed_buttons.forEach(btn => {
            btn.addEventListener('click', ()=>{
                speed_buttons.forEach(el => el.classList.remove('snake_speed_active'))
                btn.classList.add('snake_speed_active');
                let speed = btn.getAttribute('data-speed');
                this.setSpeed(speed)
            })
        })

        document.addEventListener('keydown', (e)=>{
            if(this.game) {
                if(e.code == 'ArrowUp' && this.snake.current_direction !== 'down') this.snake.new_direction = 'up';
                if(e.code == 'ArrowDown' && this.snake.current_direction !== 'up') this.snake.new_direction = 'down';
                if(e.code == 'ArrowRight' && this.snake.current_direction !== 'left') this.snake.new_direction = 'right';
                if(e.code == 'ArrowLeft' && this.snake.current_direction !== 'right') this.snake.new_direction = 'left';
            }
        })
    }

    setSpeed(speed){
        switch (speed){
            case '1': this.game_speed = 400; break;
            case '2': this.game_speed = 300; break;
            case '3': this.game_speed = 230; break;
            case '4': this.game_speed = 160; break;
            case '5': this.game_speed = 80; break;
        }
    }

    restart(){
        this.snake.resetSnake();
        this.food.newFood(this.snake);
        this.game = false;
        if(this.step) clearInterval(this.step);

        this.renderer.render(this.snake, this.food)
        this.updatePoints();
        this.enableButtons()
    }

    startGame(){
        if(this.game) return;
        this.game = true;
        this.disableButtons()

        this.step = setInterval(()=>{
            this.snake.move()

            if(!this.snake.eatFood(this.food)){
                this.snake.body.splice(0,1);
            }
            if(this.snake.crash()){
                this.game = false;
                clearInterval(this.step)
            }

            this.renderer.render(this.snake, this.food)
            this.updatePoints();

        }, this.game_speed)
    }

    updatePoints(){
        document.getElementById('snake_result').innerText = this.snake.foodEaten;
    }

    disableButtons(){
        document.getElementById('snake_start_btn').setAttribute('disabled', true)
        document.querySelectorAll('.snake_set_speed_btn').forEach(btn => btn.setAttribute('disabled', true))
    }
    enableButtons(){
        document.getElementById('snake_start_btn').removeAttribute('disabled');
        document.querySelectorAll('.snake_set_speed_btn').forEach(btn => btn.removeAttribute('disabled'))
    }
}
