export default {
    SET_TODAY(state, value){
        let cur_day = new Date().getDate();
        let cur_month = new Date().getMonth() + 1;
        let cur_year = new Date().getFullYear();
        if(cur_day < 10) cur_day = '0'+cur_day;
        if(cur_month < 10) cur_month = '0'+cur_month;

        state.today = `${cur_day}.${cur_month}.${cur_year}`;
    },

    SET_ALERT(state, obj){
        state.alert_remove = obj;
    },

    UNSET_ALERT(state){
        state.alert_remove = null
    },

    /* USER CATEGORIES */

    SET_USER_CATEGORY_ID(state, value){
        state.new_category.id = value;
    },

    REMOVE_USER_CATEGORY(state, index){
        state.user_categories.splice(index, 1);
    },

    UPDATE_NEW_CATEGORY_NAME(state, value){
        state.new_category.name = value;
    },

    RESET_NEW_CATEGORY(state){
        state.new_category.id = null;
        state.new_category.name = null;
    },

    ADD_USER_CATEGORY(state, category){
        state.user_categories.push({
            id: category.id,
            name: category.name,
        })
    },

    /* TASK LIST */

    SET_SEARCH_STR(state, value){
        state.searchStr = value;
    },

    SET_NEW_TASK_USER_CATEGORY(state, id){
        state.new_task.user_category.id = null;
        state.new_task.user_category.name = null;

        if(id) {
            let category = state.user_categories.find(el => el.id === id)
            if(category) {
                state.new_task.user_category.id = category.id;
                state.new_task.user_category.name = category.name;
            }
        }
    },

    SET_CATEGORY(state, value){
        state.category = value
    },

    SET_RENDER_TASKS_LIST(state, tasks){
        state.render_tasks = [];
        tasks.forEach(item => {
            state.render_tasks.push(item);
        })
    },

    SET_TASK_COMPLETED(state, task){
        task.complete = true;
    },

    UPDATE_TASK_FAVORITE(state, task){
        task.favorite = !task.favorite;
    },

    REMOVE_TASK_FROM_RENDER(state, index){
        state.render_tasks.splice(index, 1);
    },



    /* NEW TASK MUTATIONS */

    INIT_NEW_TASK(state){
        state.new_task = {
            id: null,
            favorite: null,
            complete: null,
            message: null,
            create_date: null,
            to_date: {
                day: null,
                month: null,
                year: null,
            },
            to_time: {
                hour: null,
                minute: null,
            },
            flow_task: false,
            user_category: {
                id: null,
                name: null,
            },
        }
    },

    SET_NEW_TASK_ID(state, value){
        state.new_task.id = value;
    },

    SET_NEW_TASK_COMPLETED_FALSE(state){
        state.new_task.complete = false;
    },

    SET_NEW_TASK_TYPE(state, value){
        state.new_task.flow_task = value;
    },

    SET_NEW_TASK_DAY(state, {day , month, year}){
        state.new_task.to_date.day = day;
        state.new_task.to_date.month = month;
        state.new_task.to_date.year = year;
    },

    SET_NEW_TASK_CREATE_DATE(state, value){
        state.new_task.create_date = value;
    },

    SET_NEW_TASK_TIME_HOUR(state, value){
        state.new_task.to_time.hour = value;
    },

    SET_NEW_TASK_TIME_MINUTE(state, value){
        state.new_task.to_time.minute = value;
    },

    UPDATE_NEW_TASK_MESSAGE(state, value){
        state.new_task.message = value;
    },

    UPDATE_NEW_TASK_FAVORITE(state, value){
        state.new_task.favorite = value;
    },


    /* AUTH MUTATIONS */

    SET_USER(state, value){
        state.user = value;
        if(!state.user) state.user_categories = [];
    },

    SET_USER_ERROR(state, value){
        state.user_err = value;
    },

    SET_VALIDATION_LOGIN(state, value){
        state.valid_login = value;
    },

    SET_VALIDATION_PIN(state, value){
        state.valid_pin = value;
    },

    SET_AUTH_VALIDATE(state, value) {
        state.validate_auth = value;
    }
}
