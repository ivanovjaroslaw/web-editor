import moment from 'moment';

const filters = {
  'formatDate': (ms) => {
    if (!ms) {
      return '-';
    }

    const targetMoment = moment.unix(ms / 1000);
    const currentMoment = moment.utc();

    if (currentMoment.diff(targetMoment, 'days') < 1) {
      return targetMoment.format('hh:mm:ss');
    }

    return targetMoment.format('MM/DD/YYYY hh:mm:ss');
  },
};

export default filters;
