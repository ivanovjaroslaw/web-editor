import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardComponent from '../components/dashboard.component';
import DocumentComponent from '../components/document.component';
import AuthService from '../services/auth.service';

Vue.use(VueRouter);

const routes = [
  { name: 'dashboard', path: '/', component: DashboardComponent },
  { name: 'document', path: '/:documentId', component: DocumentComponent }
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  const authService = new AuthService();

  if (!authService.user) {
    authService
      .signInAnonymously()
      .subscribe(() => { next(); });
  } else {
    next();
  }
});

export default router;
