import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify, {
    iconfont: 'mdi'
});

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                //HOW TO USE: if the Vue component supports color prop use it like color="gruen"
                //otherwise create a class and use like background-color: var(--v-gruen-base);

                // Matrix color pallet
                matrixBlack: '#0D0208',
                darkGreen: '#003B00',
                green: '#008F11',
                lightGreen: '#00FF41',

                // Widget Color
                header1: '#ff6a00',
                header2: '#008F11',
            },
        },
    },

});
