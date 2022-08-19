export default class SnakeRender {
    constructor(){}

    renderField(){
        let html_table = '';
        for(let row = 1; row <= 12; row++){
            html_table += `<tr>`;
            for(let col = 1; col <= 12 ; col++){
                html_table += `<td class="snake-field" data-col="${col}" data-row="${row}"></td>`
            }
            html_table += `</tr>`;
        }
        document.getElementById('snake_field').insertAdjacentHTML('beforeend', html_table);
    }

    render(snake, food){
        document.querySelectorAll('.snake-field').forEach(field => {
            field.classList.remove('snake-field-snake-body');
            field.classList.remove('snake-field-food');

            let field_col = field.getAttribute('data-col');
            let field_row = field.getAttribute('data-row');

            snake.body.forEach(bodyElement => {
                if(bodyElement.pos_row == field_row && bodyElement.pos_col == field_col){
                    field.classList.add('snake-field-snake-body')
                }
            })

            if(food && food.cordinate.col == field_col && food.cordinate.row == field_row){
                field.classList.add('snake-field-food')
            }
        })
    }
}
