import Vue from 'vue';
import VueRouter from 'vue-router';
import DashboardComponent from '../components/DashboardComponent';
import DocumentComponent from '../components/DocumentComponent';

Vue.use(VueRouter);

const routes = [
  { name: 'dashboard', path: '/', component: DashboardComponent },
  { name: 'document', path: '/:documentId', component: DocumentComponent }
];

const router = new VueRouter({ routes });

export default router;
