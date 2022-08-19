import AuthActions from "./_actions_auth"
import TaskActions from "./_actions_tasks"
import VueRouter from "../../../../Vue-router";

export default {
    ...AuthActions,
    ...TaskActions,

    alert_remove(ctx, {message, method, payload}){
        ctx.commit('SET_ALERT', {
            message,
            method,
            payload
        })
    },

    executeAlert(ctx){
        ctx.dispatch(ctx.state.alert_remove.method, ctx.state.alert_remove.payload)
        ctx.commit('UNSET_ALERT')
    },

    cancelAlert(ctx){
        ctx.commit('UNSET_ALERT')
    },

    init(ctx){
        ctx.dispatch('initLocalStorage');
        ctx.dispatch('checkAuth');
        ctx.commit('SET_TODAY');

        const storage = JSON.parse(localStorage.getItem('todo_storage'));
        if(ctx.state.user){
            // пользовательские категории
            if(storage.user_categories.length){
                storage.user_categories.forEach((category) => {
                    ctx.commit('ADD_USER_CATEGORY', category)
                })
            }

            // проверка активной категории
            if(storage.category) {
                ctx.dispatch('selectCategory', storage.category);
            } else {
                ctx.dispatch('selectCategory', ctx.state.categories[0])
            }
        }
    },

    searchTasks(ctx, event){
        let string = event.target.value;

        if(!string) {
            ctx.dispatch('selectCategory', ctx.state.categories[0])
            return
        }

        ctx.commit('SET_CATEGORY', { id: 98, name: 'Поиск' });
        ctx.commit('SET_SEARCH_STR', string)

        const storage = JSON.parse(localStorage.getItem('todo_storage'));
        const user = storage.users.find(el => el.user_name = ctx.state.user);

        let array = [];
        let regExp = new RegExp(string, 'i');

        user.tasks.forEach(task => {
            if(task.message.match(regExp)) {
                array.push(task)
            }
        })

        localStorage.setItem('todo_storage', JSON.stringify(storage));
        ctx.commit('SET_RENDER_TASKS_LIST', array)
    },

    check_task_time_off(ctx, [ task , date ]){
        let current_hour = date.getHours()
        let current_minute = date.getMinutes()
        let currentDay = date.getDate();
        let currentMonth = date.getMonth()+1;
        let currentYear = date.getFullYear();

        if( task.to_date.year < currentYear
            || task.to_date.year == currentYear && task.to_date.month < currentMonth
            || task.to_date.year == currentYear && task.to_date.month == currentMonth && task.to_date.day < currentDay
            || task.to_date.year == currentYear && task.to_date.month == currentMonth && task.to_date.day == currentDay
            && (task.to_time.hour < current_hour || task.to_time.hour == current_hour && task.to_time.minute < current_minute)
        ) task.time_off = true;
    },

    selectCategory(ctx, category){
        const storage = JSON.parse(localStorage.getItem('todo_storage'));
        const user = storage.users.find(el => el.user_name === ctx.state.user);

        ctx.commit('SET_CATEGORY', category)

        let date = new Date();
        user.tasks.forEach(task =>{
            ctx.dispatch('check_task_time_off', [ task , date ]);
        })

        let array = [];

        switch (category.id) {
            case 1: // Все
                user.tasks.forEach(task => {
                    if(!task.complete && !task.time_off) array.push(task)
                })
                storage.category = category;
                ctx.commit('SET_RENDER_TASKS_LIST', array)
                break;

            case 2: // Сегодня
                let task_date = '';
                user.tasks.forEach(task => {
                    task_date = `${task.to_date.day}.${task.to_date.month}.${task.to_date.year}`;
                    if(task_date == ctx.state.today && !task.complete && !task.time_off){
                        array.push(task);
                    }
                })
                storage.category = category;
                ctx.commit('SET_RENDER_TASKS_LIST', array)
                break;

            case 3: // Важные
                user.tasks.forEach(task => {
                    if(task.favorite && !task.complete && !task.time_off) array.push(task);
                })
                storage.category = category;
                ctx.commit('SET_RENDER_TASKS_LIST', array)
                break;

            case 4: // Завершенные
                user.tasks.forEach(task => {
                    if(task.complete && !task.time_off) array.push(task);
                })
                storage.category = category;
                ctx.commit('SET_RENDER_TASKS_LIST', array)
                break;

            case 5: // Просроченные
                user.tasks.forEach(task => {
                    if(task.time_off) array.push(task)
                })
                storage.category = category;
                ctx.commit('SET_RENDER_TASKS_LIST', array)
                break;
            default:
                user.tasks.forEach(task => {
                    if(task.user_category.id === category.id && !task.complete  && !task.time_off) array.push(task);
                })
                storage.category = category;
                ctx.commit('SET_RENDER_TASKS_LIST', array)
                break;
        }

        if(ctx.state.searchStr) ctx.commit('SET_SEARCH_STR', null)

        localStorage.setItem('todo_storage', JSON.stringify(storage));
        if(VueRouter.currentRoute.path !== '/todo') VueRouter.push('/todo');
    },

    createUserCategory(ctx){
        if(!ctx.state.new_category.name || ctx.state.new_category.name.length > 20) return;

        const storage = JSON.parse(localStorage.getItem('todo_storage'));

        storage.category_id_counter++;

        ctx.commit('SET_USER_CATEGORY_ID', storage.category_id_counter)
        ctx.commit('ADD_USER_CATEGORY', ctx.state.new_category )
        storage.user_categories.push( ctx.state.new_category )

        localStorage.setItem('todo_storage', JSON.stringify(storage)) ;
        ctx.commit('RESET_NEW_CATEGORY') ;
    },

    delete_category(ctx, id){
        const storage = JSON.parse(localStorage.getItem('todo_storage'));
        const user = storage.users.find(el => el.user_name === ctx.state.user);

        storage.user_categories.splice(storage.user_categories.findIndex(el => el.id === id), 1);
        storage.category = null;

        user.tasks.forEach((task, index) => {
            if(task.user_category.id == id) user.tasks.splice(index, 1);
        })

        ctx.commit('REMOVE_USER_CATEGORY', ctx.state.user_categories.findIndex(el => el.id === id));

        localStorage.setItem('todo_storage', JSON.stringify(storage));

        ctx.dispatch('selectCategory', ctx.state.categories[0]);
    },

    initLocalStorage(ctx){
        if(localStorage.getItem('todo_storage')) return;
        localStorage.setItem( 'todo_storage', JSON.stringify({
            users: [],
            category: null,
            category_id_counter: 99,
            task_id_counter: 0,
            user_categories: [],
        }))
    },
}
