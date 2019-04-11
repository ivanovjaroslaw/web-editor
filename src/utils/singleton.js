export default class Singleton {
  static instance = null;

  constructor () {
    Singleton.instance = this;

    if (!Singleton.instance) {
      throw new Error('Cannot construct singleton');
    }
  }
};
