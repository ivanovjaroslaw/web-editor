import Vue from 'vue';
import App from './app.vue';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import config from './config';
import router from './router';
import ApiAuthAdapter from './adapters/api-auth.adapter';
import vueFilters from './plugins/filters';
import vueDirectives from './plugins/directives';
import 'material-design-lite/material.js';

import 'material-design-lite/material.css';
import 'assets/main.scss';

firebase.initializeApp(config.firebase);

export const apiResourceProvider = firebase.database();
export const ApiResourceProviderNamespace = firebase.database;

export const ApiAuthAdapterInstance = new ApiAuthAdapter(firebase.auth());
ApiAuthAdapterInstance.setHandlers();

for (let key in vueFilters) {
  Vue.filter(key, vueFilters[key]);
}

for (let key in vueDirectives) {
  Vue.directive(key, vueDirectives[key]);
}

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
