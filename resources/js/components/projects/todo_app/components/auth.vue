<template>
    <div class="todo-auth">
        <div class="todo-auth-actions" v-if="!authenticate && !create">
            <button @click.prevent="create = true">Создать пользователя</button>
            <button @click.prevent="authenticate = true">Войти</button>
        </div>

        <!--   создание пользователя   -->
        <div class="todo-auth-create" v-if="create">
            <button class="todo-auth-btn-back" @click.prevent="create = false">
                <i class="fas fa-undo"></i>
            </button>
            <h2>Создание пользователя:</h2>

            <input v-model="user_name"
                   type="text"
                   :class="{'todo-input-err': !get_ValidLogin}"
                   placeholder="Укажите Имя / Логин">

            <p>*Только буквы и "_". Длинна не меньше 3 символов и не более 20.</p>

            <input class="todo-auth-pincode-input"
                   v-model="pin_code"
                   :class="{'todo-input-err': !get_ValidPin}"
                   @input="check_pin_code"
                   placeholder="пин-код"
                   type="number">

            <button class="todo-auth-create-submit-btn"
                @click.prevent="createUser([user_name, pin_code])"> Создать профиль. </button>
            <p>*Все(!) данные будут храниться в браузере на вашем компьютере.</p>
        </div>


        <!--    авторизация пользователя    -->
        <div class="todo-auth-authenticate" v-if="authenticate">
            <button class="todo-auth-btn-back" @click.prevent="authenticate = false">
                <i class="fas fa-undo"></i>
            </button>
            <h2>Авторизуйтесь</h2>
            <input v-model="user_name"
                   type="text"
                   :class="{'todo-input-err': !get_ValidLogin}"
                   placeholder="Введите логин">

            <input class="todo-auth-pincode-input"
                   :class="{'todo-input-err': !get_ValidPin}"
                   v-model="pin_code"
                   @input="check_pin_code"
                   placeholder="пин-код"
                   type="number">


            <button class="todo-auth-create-login-btn"
                @click.prevent="login([user_name, pin_code])"> принять </button>

            <p class="todo-auth-authenticate-error"
               v-if="get_UserError"> * Ошибка авторизации
            </p>
            <p v-else> * Все данные будут храниться в браузере.</p>
        </div>

    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default{
    name: 'todo-auth',
    data(){ return {
        authenticate: false,
        create : false,

        user_name: null,
        pin_code: null,
    }},

    computed: mapGetters('todo', ['get_user', 'get_ValidLogin', 'get_ValidPin', 'get_UserError']),
    methods: {
        ...mapActions('todo', ['createUser', 'login']),

        check_pin_code(e){
            if(e.target.value.length > 4){
                this.pin_code = e.target.value.slice(0, 4)
            }
        },
    },

    beforeMount() {
        if(this.get_user) this.$router.push("/todo");
    }
}
</script>
<style scoped></style>
