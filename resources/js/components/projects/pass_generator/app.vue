<template>
    <div class="pass-gen-app">
        <div class="pass-gen-header">
            <h3>Генератор паролей</h3>
            <button @click.prevent="back"><i class="fas fa-times"></i></button>
        </div>
        <hr>
        <div class="pass-gen-options">
            <p>Установите длину пароля: {{ gen_length }}</p>
            <input v-model="gen_length" min="6" max="18" type="range">
            <div>
                <input type="checkbox" v-model="use_numbers"><span> Использовать числа</span>
            </div>
            <div>
                <input type="checkbox" v-model="use_special"><span> Использовать специальные символы</span>
            </div>
        </div>

        <div class="pass-gen-app-result-block">
            <div class="pass-gen-app-result-title">
                <h3>Ваш пароль:</h3>
                <button @click.prevent="generate"><i class="fas fa-repeat"></i></button>
            </div>
            <div class="pass-gen-app-result">
                <p>{{ result }}</p>
                <button @click.prevent="copy">
                    <span id="pass-gen-copy-alert">copy!</span>
                    <i id="pass-gen-copy-button" class="fa-regular fa-copy"></i>
                    <i id="pass-gen-copy-check" class="fa-solid fa-check"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "pass-gen-app",

    data(){
        return{
            gen_length: 6,
            password : null,
            use_numbers: true,
            use_special: false,
            pass_symbols: [],
            copy_pass: null,
            special_symbols: [
                '!', '+', '$', '%', '&', '(', ')', '*', '\"', '\'', '+', ',',
                '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[',
                '\\', ']', '^', '_', '`', '{', '|', '}', '~',
            ],
            numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',],
            letters: [
                'A','a', 'B','b', 'C','c', 'D','d', 'E','e',
                'F','f', 'G','g', 'H','h', 'I','i', 'G','g',
                'K','k', 'L','l', 'M','m', 'N','n', 'O','o',
                'P','p', 'Q','q', 'R','r', 'S','s', 'T','t',
                'U','u', 'V','v', 'W','w', 'X','x', 'Y','y',
                'Z','z',
            ],
            animations: {
                copy_check: false,
            },
        }
    },

    computed: {
        result(){
            return this.generate();
        }
    },

    methods: {
        generate(){
            this.pass_symbols = [];

            for(let i = 0; i < this.letters.length; i++){
                this.pass_symbols.push(this.letters[i])
            }
            if(this.use_numbers){
                for(let i = 0; i < this.numbers.length; i++){
                    this.pass_symbols.push(this.numbers[i])
                }
            }
            if(this.use_special){
                for(let i = 0; i < this.special_symbols.length; i++){
                    this.pass_symbols.push(this.special_symbols[i])
                }
            }

            this.password = '';

            for(let i = 0; i < this.gen_length; i++){
                let random = +(Math.random()*this.pass_symbols.length).toFixed()
                if(random === this.pass_symbols.length) --random;
                this.password = this.password + this.pass_symbols[random];
            }
            return this.password;
        },

        copy(){
            if(this.copy_pass === this.password) return;

            navigator.clipboard.writeText(this.password).then(()=>{
                this.copy_pass = this.password;
                if(this.animations.copy_check) return;
                this.animateSuccessCopy()
            });
        },

        animateSuccessCopy(){
            let copy_alert = document.getElementById('pass-gen-copy-alert');
            let copy_el = document.getElementById('pass-gen-copy-button');
            let check_el = document.getElementById('pass-gen-copy-check');

            this.animations.copy_check = true;
            setTimeout(()=>{
                this.animations.copy_check = false;
            }, 600)

            Velocity(copy_alert, { opacity: 1,  top: '-13px'}, { duration: 200 } );
            Velocity(copy_alert, { opacity: 0 }, { duration: 200 });
            Velocity(copy_alert, { top: '-5px' }, { delay: 200 });

            Velocity(copy_el, { opacity: 0 }, { duration: 100 } );
            Velocity(check_el, { opacity: 1 }, { duration: 200 } );

            Velocity(copy_el, { opacity: 1 }, { delay: 300, duration: 500 });
            Velocity(check_el, { opacity: 0 }, { delay: 300, duration: 200 });
        },

        back(){
            this.$router.back()
        }
    }
}

</script>

<style scoped>

</style>
