export default Base => class Mixin extends Base {
  static instance = null;

  constructor () {
    if (Mixin.instance) {
      return Mixin.instance;
    } else {
      super();

      Mixin.instance = this;
    }
  }
};
