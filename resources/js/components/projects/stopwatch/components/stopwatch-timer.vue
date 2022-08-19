<template>
    <div>
        <div class="stopwatch-timer-value" :class="{'dark-theme' : getDark}">
            <div>
                <p>{{ getHour }}</p>
                <p>часы</p>
            </div>
            <span>:</span>
            <div>
                <p>{{ getMinute }}</p>
                <p>минуты</p>
            </div>
            <span>:</span>
            <div>
                <p>{{ getSec }}</p>
                <p>секунды</p>
            </div>
            <span>:</span>
            <div>
                <p>{{ getMsec }}</p>
                <p>милисек.</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "stopwatch-timer",

    computed: mapGetters("stopwatch", ['getDark', 'getMsec', 'getSec', 'getMinute', 'getHour']),
}
</script>

<style scoped>

</style>
