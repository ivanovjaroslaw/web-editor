import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardComponent from '../components/dashboard.component';
import DocumentComponent from '../components/document.component';
import { ApiAuthAdapterInstance } from '../index';

Vue.use(VueRouter);

const routes = [
  { name: 'dashboard', path: '/', component: DashboardComponent },
  { name: 'document', path: '/:documentId', component: DocumentComponent },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (!ApiAuthAdapterInstance.user) {
    ApiAuthAdapterInstance
      .signInAnonymously()
      .subscribe(() => { next(); });
  } else {
    next();
  }
});

export default router;
