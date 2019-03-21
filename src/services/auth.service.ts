import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { authProvider } from '../index';
import BaseService from '../utils/base.service';

export default class AuthService extends BaseService {
  public user: any = null;
  private _authStateChanged: any = null;

  constructor() {
    super();

    this._setHandlers();
  }

  public signInAnonymously() {
    const promise = authProvider
      .signInAnonymously()
      .catch(this._catchError);

    return from(promise)
      .pipe(
        catchError(this._catchError),
      );
  }

  private _setHandlers() {
    this._authStateChanged = authProvider
      .onAuthStateChanged(
        (user) => {
          this.user = user;
        },
        (error) => {
          this._catchError(error);
        },
      );
  }
}
