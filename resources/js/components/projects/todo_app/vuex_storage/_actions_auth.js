import VueRouter from "../../../../Vue-router";

export default {
    login(ctx, [user_name, pin_code]){
        const storage = JSON.parse(localStorage.getItem('todo_storage'));

        let user = storage.users.find(el => el.user_name == user_name && el.pin_code == pin_code)
        if(!user){
            ctx.commit('SET_USER_ERROR', true)
            return;
        }
        ctx.commit('SET_USER_ERROR', false)
        ctx.commit('SET_USER', user.user_name)
        cookie.set('todo_user', user.user_name)

        localStorage.setItem('todo_storage', JSON.stringify(storage))

        ctx.commit('SET_CATEGORY', ctx.state.categories[0]);
        VueRouter.push("/todo")
    },

    logout(ctx){
        cookie.remove('todo_user');
        ctx.commit('SET_USER', null);
        VueRouter.push("/todo/auth");
    },

    validationAuth(ctx, [user_name, pin_code]){
        let valid = true;
        ctx.commit('SET_VALIDATION_PIN', true)
        ctx.commit('SET_VALIDATION_LOGIN', true)

        if(!pin_code || pin_code.length !== 4 || !pin_code.match(/^\d+$/)){
            ctx.commit('SET_VALIDATION_PIN', false)
            valid = false;
        }
        if(!user_name || user_name.length > 20 || user_name.length < 3 || !user_name.match(/^[A-Za-zЁёА-я_]+$/)){
            ctx.commit('SET_VALIDATION_LOGIN', false)
            valid = false;
        }

        ctx.commit('SET_AUTH_VALIDATE', valid)
    },

    createUser(ctx, [user_name, pin_code]){
        ctx.dispatch('validationAuth', [user_name, pin_code])
        if(!ctx.state.validate_auth) return;

        const storage = JSON.parse(localStorage.getItem('todo_storage'));

        if(storage.users.find(el => el.user_name === user_name)) {
            alert('имя пользователя уже занято')
            return;
        }

        let user = {
            user_name: user_name,
            pin_code: pin_code,
            tasks: [],
        }

        storage.users.push(user);
        cookie.set('todo_user', user_name)
        ctx.commit('SET_USER', user_name)

        localStorage.setItem('todo_storage', JSON.stringify(storage))
        VueRouter.push('/todo');
    },

    checkAuth(ctx){
        if(!cookie.get('todo_user')){
            if(VueRouter.currentRoute.path == "/todo/auth") return;
            VueRouter.push("/todo/auth")

        } else {
            const storage = JSON.parse(localStorage.getItem('todo_storage'));
            const user = storage.users.find(el => el.user_name === cookie.get('todo_user'))

            ctx.commit('SET_USER', user.user_name);

            localStorage.setItem('todo_storage', JSON.stringify(storage));
        }
    },
}
