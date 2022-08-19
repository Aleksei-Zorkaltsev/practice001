export default class Food {
    constructor() {
        this.cordinate = {
            col: null,
            row: null,
        }
    }
    newFood(snake){
        this.cordinate.col = Math.floor(Math.random() * 11)+1;
        this.cordinate.row = Math.floor(Math.random() * 11)+1;
        let bodyElement = snake.body.find(bodyElement => bodyElement.pos_col == this.cordinate.col && bodyElement.pos_row == this.cordinate.row)
        if(bodyElement) this.newFood(snake);
    }
}
