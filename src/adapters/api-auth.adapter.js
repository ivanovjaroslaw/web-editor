import BaseGateway from '../utils/base.gateway';
import Singleton from '../utils/singleton';
import UserGateway from '../gateways/user.gateway';
import RandomNameGateway from '../gateways/random-name.gateway';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { of, from } from 'rxjs';

export default class ApiAuthAdapter extends Singleton {
  static resourceUrl = 'users';

  _apiAuthProvider = null;

  user = null;
  authStateChangedSubscription = null;
  users = null;

  constructor (apiAuthProvider) {
    super();

    this._apiAuthProvider = apiAuthProvider;
  }

  signInAnonymously () {
    const promise = this._apiAuthProvider
      .signInAnonymously();

    return UserGateway.transform(promise)
      .pipe(
        tap((userCredential) => { this.user = userCredential.user; }),
        mergeMap((userCredential) => {
          if (!userCredential.user.displayName) {
            return this._setRandomUserDisplayName();
          }

          return of(userCredential.user);
        })
      );
  }

  signOut () {
    const promise = this._apiAuthProvider
      .signOut();

    return UserGateway.transform(promise);
  }

  setHandlers () {
    this.authStateChangedSubscription = this._apiAuthProvider
      .onAuthStateChanged(
        (user) => { this.user = user; },
        (error) => { BaseGateway.catchError(error); }
      );
  }

  setUserDisplayName (name) {
    const promise = this.user.updateProfile({ displayName: name });

    return from(promise)
      .pipe(
        mergeMap(() => {
          const data = { uid: this.user.uid, displayName: this.user.displayName };

          return UserGateway.save(this.user.uid, data);
        })
      );
  }

  _setRandomUserDisplayName () {
    return RandomNameGateway
      .getItem()
      .pipe(
        catchError(() => {
          const randomId = Math.floor(Math.random() * (101 - 1)) + 1;

          return from(`randomName${randomId}`);
        }),
        mergeMap((name) => {
          return this.setUserDisplayName(name);
        })
      );
  }
}
