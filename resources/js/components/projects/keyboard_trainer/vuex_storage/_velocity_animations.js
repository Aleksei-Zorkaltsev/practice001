export default {
    setInputError(ctx, input){
        Velocity(input, { backgroundColor: '#ff6b81' } , {
            duration: 300
        });
    },

    animateSuccess(ctx, obj){

        Velocity(obj.input, { backgroundColor: '#7bed9f' } , {
            duration: 120
        });

        Velocity(obj.input, { backgroundColor: '#1e90ff' } , {
            delay: 120,
            duration: 200
        });

        let div = document.getElementById('kbt-word-block-' + obj.id);
        let text = document.getElementById('kbt-text-id-' + obj.id);
        let icon = document.getElementById('kbt-icon-id-' + obj.id);

        Velocity(div, {
            borderRadius: "25px",
            width: "43px",
            marginLeft: "70px",
            backgroundColor: "#7bed9f",
            color: "#fff",
        },{
            duration: 200,
            easing: "easeInQuad"
        })

        Velocity(div, { opacity: 0 } , { delay: 200 });
        Velocity(text, { scale: 0, opacity: 0 }, { duration: 150, easing: "easeInQuad" })
        Velocity(icon, {opacity: 1}, { delay: 350, duration: 150, easing: "easeInQuad" })
    },


    // transitions
    beforeEnter: function (el) {
        el.style.opacity = 0
    },
    enter: function (el, done) {
        Velocity(el, { opacity: 1 ,height: '43px' }, { delay: 800, complete: done })
    },
    leave: function (el, done) {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done })
    },
}
