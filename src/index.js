import 'assets/main.scss';
import Vue from 'vue';
import App from './app.vue';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import config from './config';
import router from './router';
import ApiAuthAdapter from './adapters/api-auth.adapter';
import './utils/filters';

firebase.initializeApp(config.firebase);

export const apiResourceProvider = firebase.database();
export const ApiResourceProviderNamespace = firebase.database;

export const ApiAuthAdapterInstance = new ApiAuthAdapter(firebase.auth());
ApiAuthAdapterInstance.setHandlers();

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
