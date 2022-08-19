export default {
    get_Alert(state){
        return state.alert_remove;
    },

    get_Categories(state){
        return state.categories;
    },

    get_UserCategories(state){
        return state.user_categories;
    },

    get_CategoryName(state){
        if(!state.category) return '';
        return state.category.name;
    },

    get_CategoryId(state){
        if(!state.category) return '';
        return state.category.id;
    },

    /* TASK LIST */

    get_RenderTasks(state){
        return state.render_tasks;
    },

    get_NewTask_flowTask(state){
        return state.new_task.flow_task;
    },

    get_NewTask_favorite(state){
        return state.new_task.favorite;
    },

    get_NewTask_hour(state){
        if(!state.new_task.to_time.hour) {
            let date = new Date();
            let hour = date.getHours() + 1;
            if(hour < 10) hour = '0' + hour;
            return hour;
        }
        return state.new_task.to_time.hour;

    },

    get_NewTask_minute(state){
        if(!state.new_task.to_time.minute) return '00';
        return state.new_task.to_time.minute;
    },

    get_NewTask_DateStr(state){
        let str = '';
        if(!state.new_task.to_date.day || !state.new_task.to_date.month || !state.new_task.to_date.year){
            return str;
        }
        str = `${state.new_task.to_date.day}.${state.new_task.to_date.month}.${state.new_task.to_date.year}`;
        return str;
    },

    get_NewTask_Category(state){
        return state.new_task.user_category;
    },

    /* AUTH GETTERS */

    get_UserError(state){
        return state.user_err;
    },
    get_ValidLogin(state){
        return state.valid_login;
    },
    get_ValidPin(state){
        return state.valid_pin;
    },
    get_user(state){
        return state.user;
    },
}
