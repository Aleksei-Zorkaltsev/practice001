<template>
    <div class="projects">
        <projects-list></projects-list>
<!--        <img class="loader-blue-gif" :src="'../storage/img/loader.gif'" alt="loader.gif">-->
    </div>
</template>

<script>
import projectsList from './projects-list';

export default {

    name: "projects-component",

    data(){
        return {
            loader: 'storage/app/public/images/loader.gif'
        }
    },
    components: {
        'projects-list': projectsList,
    }
}
</script>

<style scoped>

</style>
