<template>
    <div class="tester-container tester-select-main">
        <select-test></select-test>
        <info-block></info-block>
    </div>
</template>

<script>
import SelectTest from "./select-test";
import InfoBlock from "./select-info-block";

export default {
    name: "home",

    components: {
        'info-block': InfoBlock,
        'select-test': SelectTest,
    },
}
</script>

<style scoped>

</style>
