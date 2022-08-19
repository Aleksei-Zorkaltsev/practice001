<template>

    <div class="app-main-navigation">
        <nav class="app-top-nav">
            <ul>
                <li v-for="link in topNavRoutes">
                    <router-link
                        :to="link.to"
                        :key="link.to"
                        isActive
                    >{{ link.title }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>

</template>

<script>
export default {
    name: "app-nav-component",

    data(){
        return {
            topNavRoutes: [
                {
                    to: '/',
                    title: 'Главная'
                },
                {
                    to: '/about_me',
                    title: 'Обо мне'
                },
                {
                    to: '/projects',
                    title: 'Проекты'
                },
                {
                    to: '/contacts',
                    title: 'Контакты'
                },
            ],
            currentRoute: null,
        }
    },

    methods: {
        checkRoute(link){
            if (this.currentRoute === link) return true;
            return false;
        }
    },

    beforeMount() {
        this.currentRoute = this.$router.currentRoute.path;
    }
}
</script>

<style scoped>

</style>
