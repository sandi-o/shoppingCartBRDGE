import Vue from 'vue';
import Vuex from 'vuex';

import transaction from './modules/transaction'
import item from './modules/item'
import snackbar from './modules/snackbar'
import user from './modules/user'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        item,     
        snackbar,
        transaction,
        user
    }
});