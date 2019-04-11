import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate', (ms) => {
  if (!ms) {
    return '-';
  }

  const sec = ms / 1000;
  return moment.unix(sec).format('MM/DD/YYYY hh:mm:ss');
});
