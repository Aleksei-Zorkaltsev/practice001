<template>
    <div class="projects">
        <projects-list></projects-list>
    </div>
</template>

<script>
import projectsList from './projects-list';

export default {
    name: "projects-component",

    components: {
        'projects-list': projectsList,
    }
}
</script>

<style scoped>

</style>
