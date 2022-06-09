import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
Vue.config.devtools = true;
export default new Vuex.Store({
    strict: true, // remove this in production mode for performance
    state,
    getters,
    mutations,
    actions,
});
