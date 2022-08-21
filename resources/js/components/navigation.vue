<template>

    <div class="app-main-navigation">
        <nav class="app-top-nav">
            <ul>
                <li v-for="link in navRoutes">
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
            navRoutes: [
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
        }
    },
}
</script>

<style scoped>

</style>
