import 'assets/main.scss';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Vue from 'vue';
import AppComponent from './app.component.vue';
import config from './config';
import router from './router';

firebase.initializeApp(config.firebase);

export const storageProvider = firebase.firestore();
export const authProvider = firebase.auth();
export const eventBus = new Vue();

new Vue({
  render: (h) => h(AppComponent),
  router,
}).$mount('#app');
