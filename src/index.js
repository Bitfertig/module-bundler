console.log('It`s working.');

import './main.scss';

//var hljs = require('highlight.js');
//import hljs from 'highlight.js'; // all languages
//import hljs from 'highlight.js/lib/core';
//import javascript from 'highlight.js/lib/languages/javascript';
//hljs.registerLanguage('javascript', javascript);
//import 'highlight.js/scss/vs2015.scss';
//import 'highlight.js/scss/atom-one-dark.scss';


import Vue from 'vue'
import App from './app.vue';
//Vue.use(hljs.vuePlugin); // Doesnt work ...

window.vm = new Vue({
    render: h => h(App),
}).$mount('#app');

