<template>
    <div class="todo-app-user-footer">
        <button v-if="!show_create_category" @click="show_create_category = !show_create_category"><i class="fas fa-plus"></i> Новый список </button>
        <div v-else>
            <div class="todo-app-user-footer-create-input">
                <i class="fas fa-angle-double-down"
                   @click="show_create_category = !show_create_category"></i>
                <input type="text"
                       @input="updateCategoryName"
                       :value="inputCategory"
                       placeholder="название категории">
            </div>
            <button @click.prevent="createUserCategoryAndHide"> Cоздать категорию. </button>
            <span>*максимальная длинна 20 символов</span>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "nav_create_category",

    data(){ return {
        show_create_category: false,
    }},

    computed: mapState('todo', {
        inputCategory: state => state.new_category.name,
    }),

    methods: {
        ...mapActions('todo', ['createUserCategory']),

        createUserCategoryAndHide(){
            this.createUserCategory();
            this.show_create_category = false;
        },

        updateCategoryName(e){
            this.$store.commit('todo/UPDATE_NEW_CATEGORY_NAME', e.target.value)
        }
    }
}
</script>

<style scoped>

</style>
