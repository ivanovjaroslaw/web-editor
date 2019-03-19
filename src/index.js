import 'assets/main.scss';
import Vue from 'vue';
import App from './app.vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from '../config';
import router from './router';

firebase.initializeApp(config.firebase);

export const storageProvider = firebase.firestore();
export const authProvider = firebase.auth();
/* eslint-disable no-new */
export const eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
