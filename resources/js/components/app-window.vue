<template>
    <div class="window-app">
        <app-header></app-header>
        <app-navigation></app-navigation>
        <app-content></app-content>
        <app-footer></app-footer>
    </div>
</template>

<script>

import contentComponent from './content'
import headerComponent from  './header'
import navigationComponent from './navigation'
import footerComponent from  './footer'

export default {
    name: "app-window-component",

    components: {
        'app-header': headerComponent,
        'app-navigation': navigationComponent,
        'app-content': contentComponent,
        'app-footer': footerComponent
    },
}
</script>

<style scoped>

</style>
