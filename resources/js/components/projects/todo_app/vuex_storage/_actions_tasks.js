import VueRouter from "../../../../Vue-router";

export default {

    createNewTask(ctx){
        if(!ctx.state.new_task.message){
            alert('Введите текст задачи');
            return;
        }
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        if(day < 10) day = '0' + day;
        if(month < 10) month = '0' + month;

        const storage = JSON.parse(localStorage.getItem('todo_storage'));

        if(!ctx.state.new_task.to_time.minute) ctx.commit('SET_NEW_TASK_TIME_MINUTE', '00')
        if(!ctx.state.new_task.to_time.hour) ctx.commit('SET_NEW_TASK_TIME_HOUR', '00')
        ctx.commit('SET_NEW_TASK_CREATE_DATE', `${day}.${month}.${year}`);
        ctx.commit('SET_NEW_TASK_COMPLETED_FALSE');
        ctx.commit('SET_NEW_TASK_ID', storage.task_id_counter++);

        //let newTask = JSON.parse(JSON.stringify(ctx.state.new_task));

        storage.users.find(user => user.user_name === ctx.state.user).tasks.push(ctx.state.new_task)

        localStorage.setItem('todo_storage', JSON.stringify(storage))

        ctx.commit('INIT_NEW_TASK')
        ctx.dispatch('selectCategory', ctx.state.categories[0]);
    },

    change_time_newTask(ctx, [time, direction]) {

        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();

        if(day < 10) day = '0' + day;
        if(month < 10) month = '0' + month;

        let todayDate = `${day}.${month}.${year}`;
        let newTaskDate = `${ctx.state.new_task.to_date.day}.${ctx.state.new_task.to_date.month}.${ctx.state.new_task.to_date.year}`
        let today = todayDate === newTaskDate;

        let current_hour = date.getHours();
        let current_minute = date.getMinutes();
        let rounded_minute = Math.ceil(current_minute / 10) * 10

        if(direction === 'up'){
            switch (time) {
                case 'hour':
                    if(today){
                        if(ctx.state.new_task.to_time.hour < current_hour) {
                            ctx.commit('SET_NEW_TASK_TIME_HOUR', current_hour)
                        } else {
                            ctx.commit('SET_NEW_TASK_TIME_HOUR', +ctx.state.new_task.to_time.hour + 1);
                            if(ctx.state.new_task.to_time.hour === 24) {
                                ctx.commit('SET_NEW_TASK_TIME_HOUR', current_hour)
                                if(ctx.state.new_task.to_time.minute < current_minute) ctx.commit('SET_NEW_TASK_TIME_MINUTE', rounded_minute)
                            }
                        }
                    } else {
                        ctx.commit('SET_NEW_TASK_TIME_HOUR', +ctx.state.new_task.to_time.hour + 1);
                        if(ctx.state.new_task.to_time.hour === 24) ctx.commit('SET_NEW_TASK_TIME_HOUR', 0);
                    }

                    if(ctx.state.new_task.to_time.hour < 10) ctx.commit('SET_NEW_TASK_TIME_HOUR', +ctx.state.new_task.to_time.hour);
                    break;

                case 'minute':
                    if(today){
                        ctx.commit('SET_NEW_TASK_TIME_MINUTE', +ctx.state.new_task.to_time.minute + 5);

                        if(ctx.state.new_task.to_time.minute >= 60 && ctx.state.new_task.to_time.hour == current_hour
                            || ctx.state.new_task.to_time.hour < current_hour && ctx.state.new_task.to_time.minute < current_minute){
                            ctx.commit('SET_NEW_TASK_TIME_MINUTE', rounded_minute);
                        }

                        if(ctx.state.new_task.to_time.minute >= 60 && ctx.state.new_task.to_time.hour > current_hour){
                            ctx.commit('SET_NEW_TASK_TIME_MINUTE', 0);
                        }

                    } else {
                        ctx.commit('SET_NEW_TASK_TIME_MINUTE', +ctx.state.new_task.to_time.minute + 5);

                        if(ctx.state.new_task.to_time.minute >= 60) {
                            ctx.commit('SET_NEW_TASK_TIME_MINUTE', 0);
                        }
                    }
                    if(ctx.state.new_task.to_time.minute < 10) ctx.commit('SET_NEW_TASK_TIME_MINUTE', '0'+ctx.state.new_task.to_time.minute);
                    break;
            }
        }
        if(direction === 'dawn'){
            switch (time) {
                case 'hour':
                    if(today && +ctx.state.new_task.to_time.hour <= current_hour) return;
                    if(today && ctx.state.new_task.to_time.hour == current_hour+1 && rounded_minute == 60) return;

                    ctx.commit('SET_NEW_TASK_TIME_HOUR', +ctx.state.new_task.to_time.hour - 1);

                    if(today && ctx.state.new_task.to_time.hour == current_hour && ctx.state.new_task.to_time.minute < current_minute){

                        ctx.commit('SET_NEW_TASK_TIME_MINUTE', rounded_minute);
                    }

                    if(ctx.state.new_task.to_time.hour === -1) ctx.commit('SET_NEW_TASK_TIME_HOUR', 23);
                    if(ctx.state.new_task.to_time.hour < 10) ctx.commit('SET_NEW_TASK_TIME_HOUR', '0'+ctx.state.new_task.to_time.hour);
                    break;

                case 'minute':
                    if(today && +ctx.state.new_task.to_time.hour < current_hour) return;

                    ctx.commit('SET_NEW_TASK_TIME_MINUTE', +ctx.state.new_task.to_time.minute - 5);

                    if(ctx.state.new_task.to_time.minute < 0 ) ctx.commit('SET_NEW_TASK_TIME_MINUTE', 55);

                    if(today && +ctx.state.new_task.to_time.hour == current_hour && ctx.state.new_task.to_time.minute < current_minute) {
                        ctx.commit('SET_NEW_TASK_TIME_MINUTE', rounded_minute);
                    };

                    if(ctx.state.new_task.to_time.minute < 10) ctx.commit('SET_NEW_TASK_TIME_MINUTE', '0'+ctx.state.new_task.to_time.minute);
                    break;
            }
        }
    },

    taskComplete(ctx, task){
        const storage = JSON.parse(localStorage.getItem('todo_storage'));
        const user = storage.users.find(el => el.user_name === ctx.state.user);

        ctx.commit('SET_TASK_COMPLETED', task);

        if(task.complete) setTimeout(()=>{
            let index = ctx.state.render_tasks.findIndex(el => el === task);
            ctx.commit('REMOVE_TASK_FROM_RENDER', index)

            user.tasks.find(el => el.id === task.id).complete = true;

            localStorage.setItem('todo_storage', JSON.stringify(storage));
        }, 300)
    },

    taskFavorite(ctx, task){
        const storage = JSON.parse(localStorage.getItem('todo_storage'));
        const user = storage.users.find(el => el.user_name === ctx.state.user);

        let storageTusk = user.tasks.find(el => el.id === task.id);
        storageTusk.favorite = !storageTusk.favorite;

        ctx.commit('UPDATE_TASK_FAVORITE', task);

        localStorage.setItem('todo_storage', JSON.stringify(storage));
    },

    delete_task(ctx, task) {
        const storage = JSON.parse(localStorage.getItem('todo_storage'));
        const user = storage.users.find(user => user.user_name === ctx.state.user);

        let index = user.tasks.findIndex(el => el.id === task.id);
        user.tasks.splice(index, 1);

        let render_index = ctx.state.render_tasks.findIndex(el => el.id === task.id);
        ctx.commit('REMOVE_TASK_FROM_RENDER', render_index);

        localStorage.setItem('todo_storage', JSON.stringify(storage));
    },

    clear_completed(ctx){
        const storage = JSON.parse(localStorage.getItem('todo_storage'));
        const user = storage.users.find(user => user.user_name === ctx.state.user);

        user.tasks.forEach((el, index)=> {
            if(el.complete) user.tasks.splice(index, 1)
        })

        localStorage.setItem('todo_storage', JSON.stringify(storage));
        ctx.dispatch('selectCategory', ctx.state.categories[3]);
    },

    clear_time_off(ctx){
        const storage = JSON.parse(localStorage.getItem('todo_storage'));
        const user = storage.users.find(user => user.user_name === ctx.state.user);

        user.tasks.forEach((el, index)=> {
            if(el.time_off) user.tasks.splice(index, 1)
        })

        localStorage.setItem('todo_storage', JSON.stringify(storage));
        ctx.dispatch('selectCategory', ctx.state.categories[4]);
    }

}

