import { from, ReplaySubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { apiResourceProvider } from '../index';

export default class BaseGateway {
  static baseUrl = '';
  static resourceUrl = '';

  static add (data, params) {
    const promise = apiResourceProvider
      .ref(this.getCompleteResourceUrl(params))
      .push(data);

    return this.transform(promise)
      .pipe(
        map(ref => ref.key)
      );
  }

  static save (id, data, params) {
    if (!id) {
      throw new Error(`${this.constructor.name}: Id argument is missed for saving data`);
    }

    const promise = apiResourceProvider
      .ref(this.getCompleteResourceUrl(params, id))
      .set(data);

    return this.transform(promise);
  }

  static getList (params) {
    const promise = apiResourceProvider
      .ref(this.getCompleteResourceUrl(params))
      .once('value');

    return this.transform(promise)
      .pipe(
        map(snapshots => {
          const data = [];
          snapshots.forEach((snapshot) => {
            data.push({ ...snapshot.val(), id: snapshot.key });
          });

          return data;
        })
      );
  }

  // @todo: implement correct unsubscribing
  static listenList (params) {
    const list$ = new ReplaySubject(1);

    apiResourceProvider
      .ref(this.getCompleteResourceUrl(params))
      .on(
        'value',
        (snapshots) => {
          const data = [];
          snapshots.forEach((snapshot) => {
            data.push({ ...snapshot.val(), id: snapshot.key });
          });

          list$.next(data);
        },
        (error) => { BaseGateway.catchError(error); },
      );

    return list$;
  }

  static getItem (id, params) {
    const promise = apiResourceProvider
      .ref(this.getCompleteResourceUrl(params, id))
      .once('value');

    return this.transform(promise)
      .pipe(
        map(snapshot => {
          if (!snapshot.exists()) {
            return null;
          }

          return { ...snapshot.val(), id: snapshot.key };
        })
      );
  }

  // @todo: implement correct unsubscribing
  static listenItem (id, params) {
    const item$ = new ReplaySubject(1);

    apiResourceProvider
      .ref(this.getCompleteResourceUrl(params, id))
      .on(
        'value',
        (snapshot) => {
          const data = { ...snapshot.val(), id: snapshot.key };
          item$.next(data);
        },
        (error) => { BaseGateway.catchError(error); },
      );

    return item$;
  }

  static getCompleteResourceUrl (params, id) {
    let resourceWithParams = `${this.baseUrl}${this.resourceUrl}`;

    const resourceParams = resourceWithParams.match(/[^{}]+(?=})/g);
    if (!!resourceParams && !!params) {
      resourceParams.forEach((paramKey) => {
        resourceWithParams = resourceWithParams.replace(`{${paramKey}}`, params[paramKey]);
      });
    }

    if (id) {
      resourceWithParams = `${resourceWithParams}/${id}`;
    }

    return resourceWithParams;
  }

  static transform (promise) {
    return from(promise)
      .pipe(
        catchError(this.catchError.bind(this))
      );
  }

  static catchError (error) {
    throw new Error(error);
  }
}
