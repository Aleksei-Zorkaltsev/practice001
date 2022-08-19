<template>
    <div class="tester-info-block">
        <div v-if="get_SelectedTest" class="tester-info-test">
            <h3> {{ get_SelectedTest.title }}</h3>
            <p> Кол-во вопросов: <b>{{ get_SelectedTest.questions.length }}</b></p>
            <div>
                <p>Описание:</p>
                <div class="tester-info-block-description">
                    {{ get_SelectedTest.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "info-block",

    computed: mapGetters('tester',['get_SelectedTest'])
}
</script>

<style scoped>

</style>
