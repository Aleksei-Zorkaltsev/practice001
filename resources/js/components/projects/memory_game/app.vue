<template>
    <div class="app-memory-game">
        <div class="memory-game-main">
            <div class="memory-game-area">
                <transition name="fade" mode="out-in">
                    <div v-if="endgame" class="memory-game-alert-win">
                        <h3>winner!</h3>
                    </div>
                </transition>
                <transition name="fade" mode="out-in">
                    <div v-if="!animations.animate_restart" class="memory-game-field-grid">
                        <div v-for="position in positions"
                             :key="position.id"
                             :id="`memory-game-field-id-${position.id}`"
                             class="memory-game-field">
                            <div class="memory-game-item" :class="{'mg-field-complete': position.complete}">
                                <img :src="position.img" alt="img">
                            </div>
                            <div class="memory-game-item-back"
                                 :id="`memory-game-item-id-${position.id}`"
                                 @click.prevent="checkField(position)">
                                <img :src="`../storage/img/memory_game/information_alt.png`" alt="">
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="memory-game-restart-btn">
                <button @click.prevent="restart">
                    <i class="fa-solid fa-arrow-rotate-left"></i>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "app",
    data(){
        return {
            positions: [
                {id: 1,  img: '../storage/img/memory_game/memorygameico1.png', item_id: 1, complete: false },
                {id: 2,  img: '../storage/img/memory_game/memorygameico1.png', item_id: 1, complete: false },
                {id: 3,  img: '../storage/img/memory_game/memorygameico2.png', item_id: 2, complete: false },
                {id: 4,  img: '../storage/img/memory_game/memorygameico2.png', item_id: 2, complete: false },
                {id: 5,  img: '../storage/img/memory_game/memorygameico3.png', item_id: 3, complete: false },
                {id: 6,  img: '../storage/img/memory_game/memorygameico3.png', item_id: 3, complete: false },
                {id: 7,  img: '../storage/img/memory_game/memorygameico4.png', item_id: 4, complete: false },
                {id: 8,  img: '../storage/img/memory_game/memorygameico4.png', item_id: 4, complete: false },
                {id: 9,  img: '../storage/img/memory_game/memorygameico5.png', item_id: 5, complete: false },
                {id: 10, img: '../storage/img/memory_game/memorygameico5.png', item_id: 5, complete: false },
                {id: 11, img: '../storage/img/memory_game/memorygameico6.png', item_id: 6, complete: false },
                {id: 12, img: '../storage/img/memory_game/memorygameico6.png', item_id: 6, complete: false },
                {id: 13, img: '../storage/img/memory_game/memorygameico7.png', item_id: 7, complete: false },
                {id: 14, img: '../storage/img/memory_game/memorygameico7.png', item_id: 7, complete: false },
                {id: 15, img: '../storage/img/memory_game/memorygameico8.png', item_id: 8, complete: false },
                {id: 16, img: '../storage/img/memory_game/memorygameico8.png', item_id: 8, complete: false },
            ],

            game: false,
            endgame: false,
            choiceFirst: null,
            move: false,

            animations: {
                animate_restart: false,
                animate_check: false,
            }
        }
    },

    methods: {

        restart(){
            if( this.animations.animate_restart) return;
            this.animations.animate_restart  = true;

            this.positions.forEach((position)=>{
                position.complete = false;
            });
            setTimeout(()=>{
                this.positionsShuffle()
                this.animations.animate_restart  = false;
                this.endgame = false;
            }, 600)
        },

        positionsShuffle() {
            this.positions.sort(() => Math.random() - 0.5);
        },

        animateOpenCheck(id){
            this.animations.animate_check = true;
            let animate_check = new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    return resolve();
                }, 300)
            });
            animate_check.then(()=>{
                this.animations.animate_check  = false;
            })

            let field = document.getElementById(`memory-game-field-id-${id}`);
            Velocity(field, { rotateY: '180deg' }, { duration: 300 })
        },

        animateCloseCheck(id){
            let field = document.getElementById(`memory-game-field-id-${id}`);
            Velocity(field, { rotateY: '0deg' }, {
                delay: 300,
                duration: 300
            })
        },

        animateCorrectAnswer(id){
            let field = document.getElementById(`memory-game-field-id-${id}`);
            let item = document.getElementById(`memory-game-item-id-${id}`)

            Velocity(field, {scale: '1.1',}, {duration: 200})
            Velocity(item, {
                backgroundColor: '#aa5bff',
            }, {duration: 200})
            Velocity(field, {scale: '1.0'}, { delay: 200, duration: 300 }, "easeInSine")
        },

        checkField(current_position){

            if(this.choiceFirst){
                if (this.choiceFirst === current_position.id || this.move) return;
                let firstPosition = this.positions.find((pos) => pos.id === this.choiceFirst)

                this.animateOpenCheck(current_position.id);

                if(firstPosition.item_id === current_position.item_id){
                    firstPosition.complete = true;
                    current_position.complete = true;

                    setTimeout(()=>{
                        this.animateCorrectAnswer(firstPosition.id)
                        this.animateCorrectAnswer(current_position.id)
                    }, 300)
                }

                if(this.checkEndGame()){
                    console.log('checkEndGame')
                }
                this.end_move(firstPosition.id, current_position.id);

            } else if(!this.choiceFirst && !this.move) {
                this.choiceFirst = current_position.id;
                this.animateOpenCheck(current_position.id)
            }
        },

        end_move(){
            this.move = true;
            let wait = new Promise((resolve)=>{
                setTimeout(()=>{
                    return resolve();
                }, 600);
            })
            wait.then(()=>{
                this.move = false;
                this.choiceFirst = null;
            });
        },

        checkEndGame(){
            this.endgame = true
            this.positions.forEach((position)=>{
                if(!position.complete) {
                    this.animateCloseCheck(position.id)
                    this.endgame = false;
                }
            })
            return this.endgame;
        },
    },

    mounted(){
        this.positionsShuffle()
    }
}
</script>

<style scoped>

</style>
