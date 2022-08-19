<template>
    <div class="kbt-app-content">
        <div class="kbt-app-main">
            <kbt-main-action-block></kbt-main-action-block>
            <kbt-side-info></kbt-side-info>
            <kbt-input-block></kbt-input-block>
        </div>
    </div>
</template>

<script>

import sideInfo from "./side-info-block";
import inputBlock from "./input-block"
import mainActionBlock from "./main-action-block";

export default {
    name: "kbt-content",

    components: {
        'kbt-side-info': sideInfo,
        'kbt-input-block': inputBlock,
        'kbt-main-action-block': mainActionBlock,
    },
}
</script>

<style scoped>

</style>
