import 'assets/main.scss';
import Vue from 'vue';
import App from './App.vue';
import Vuefire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import config from '../config';
import router from './router';

Vue.use(Vuefire);

firebase.initializeApp(config.firebase);

export const db = firebase.firestore();

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
