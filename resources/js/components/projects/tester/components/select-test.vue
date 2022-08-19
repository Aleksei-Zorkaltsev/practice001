<template>
    <div class="tester-select-test">
        <div>
            <h3>Выберите тему теста:</h3>
        </div>

        <div class="tester-tests-table">
            <div class="tester-tests-table-title">
                <p> Тема: </p>
            </div>
            <div v-for="(test, index) in get_Tests"
                 @click="selectTest(test)"
                 class="tester-tests-table-item"
                 :key="index"
                 :class="{ 'tester-tests-table-item-select': get_SelectedTest == test }">
                <p>{{ test.title }}</p>
            </div>
        </div>

        <div class="tester-select-test-actions">
            <router-link :to="`/tester/create`">Новый тест</router-link>

            <router-link v-if="get_SelectedTest" :to="`/tester/test/${get_SelectedTest.id}`">Пройти тест</router-link>
            <a v-else disabled>Выберите тест</a>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "select-test",
    computed: {
        ...mapGetters('tester', ['get_SelectedTest', 'get_Tests']),
    },
    methods: mapActions('tester', ['selectTest', 'startTest']),
}
</script>

<style scoped>

</style>
