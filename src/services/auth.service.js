import { authProvider } from '../index';
import SingletonMixin from '../utils/singleton.mixin';
import BaseService from '../utils/base.service';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';

export default class AuthService extends SingletonMixin(BaseService) {
  authStateChanged = null;
  user = null;

  constructor () {
    super();

    this._setHandlers();
  }

  signInAnonymously () {
    const promise = authProvider
      .signInAnonymously()
      .catch(this._catchError);

    return from(promise)
      .pipe(
        catchError(this._catchError)
      );
  }

  _setHandlers () {
    this.authStateChanged = authProvider
      .onAuthStateChanged(
        (user) => {
          this.user = user;
        },
        (error) => {
          this._catchError(error);
        }
      );
  }
}
