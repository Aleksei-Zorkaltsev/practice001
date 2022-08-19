export default class Snake {
    constructor(){
        this.current_direction = 'up';
        this.new_direction = 'up';
        this.foodEaten = 0;

        this.body = [
            {
                pos_row: 12,
                pos_col: 5,
            },
            {
                pos_row: 11,
                pos_col: 5,
            },
            {
                pos_row: 10,
                pos_col: 5,
            },
        ]
    }

    move(){
        let bodyElement = {
            pos_row: null,
            pos_col: null,
        }

        switch (this.new_direction) {
            case "up":
                this.current_direction = 'up';
                bodyElement.pos_col = this.body[this.body.length-1].pos_col;
                bodyElement.pos_row = this.body[this.body.length-1].pos_row - 1;

                break;

            case "down":
                this.current_direction = 'down';
                bodyElement.pos_col = this.body[this.body.length-1].pos_col;
                bodyElement.pos_row = this.body[this.body.length-1].pos_row + 1;
                break;

            case "left":
                this.current_direction = 'left';
                bodyElement.pos_col = this.body[this.body.length-1].pos_col - 1;
                bodyElement.pos_row = this.body[this.body.length-1].pos_row;
                break;

            case "right":
                this.current_direction = 'right';
                bodyElement.pos_col = this.body[this.body.length-1].pos_col + 1;
                bodyElement.pos_row = this.body[this.body.length-1].pos_row;
                break;
        }

        this.body.push(bodyElement);

    }

    crash(){
        let head = this.body[this.body.length -1];
        let element = this.body.find(bodyElement => {
            if(bodyElement.pos_row == head.pos_row && bodyElement.pos_col == head.pos_col && bodyElement !== head){
                return true;
            }
            if(head.pos_row > 12 || head.pos_col > 12 || head.pos_row <= 0 || head.pos_col <=  0){
                return true;
            }
        })
        if(element) return true;
    }

    eatFood(food){
        let result = this.body.find(el => food.cordinate.col == el.pos_col && food.cordinate.row == el.pos_row);
        if(result) {
            this.foodEaten++;
            food.newFood(this);
        }
        return result;
    }

    resetSnake(){
        this.current_direction = 'up';
        this.new_direction = 'up';
        this.foodEaten = 0;
        this.body = [
            {
                pos_row: 12,
                pos_col: 5,
            },
            {
                pos_row: 11,
                pos_col: 5,
            },
            {
                pos_row: 10,
                pos_col: 5,
            },
        ];
    }
}
