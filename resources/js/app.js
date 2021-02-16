/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';

window.Vue = require('vue');

import Vuetify from '@/plugins/vuetify';
import {store} from '@/js/stores/store';
import VueSignaturePad from 'vue-signature-pad';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

import Routes from '@/js/routes.js';

Vue.use(VueSignaturePad)

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app-home', require('./components/home.vue').default);
Vue.component('app-register', require('./components/auth/register.vue').default);
Vue.component('app-login', require('./components/auth/login.vue').default);
Vue.component('app-forgot-password', require('./components/auth/passwords/email.vue').default);
Vue.component('app-reset-password', require('./components/auth/passwords/reset.vue').default);
Vue.component('app-snackbar', require('./components/common/snackbar.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    vuetify: Vuetify,
    router: Routes,
    store,
    el: '#app',
});
