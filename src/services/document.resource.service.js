import { storageProvider } from '../index';
import SingletonMixin from '../utils/singleton.mixin';
import BaseService from '../utils/base.service';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';

export default class DocumentResourceService extends SingletonMixin(BaseService) {
  static key = 'documents';

  get resultEndpoint () {
    return DocumentResourceService.key;
  }

  add (data) {
    const promise = storageProvider
      .collection(this.resultEndpoint)
      .add(data);

    return from(promise)
      .pipe(
        catchError(this._catchError)
      );
  }

  save (id, data) {
    if (!id) {
      throw new Error('Id is missed for saving data');
    }

    const promise = storageProvider
      .collection(this.resultEndpoint)
      .doc(id)
      .set(data);

    return from(promise)
      .pipe(
        catchError(this._catchError)
      );
  }

  getItem (id) {
    const promise = storageProvider
      .collection(this.resultEndpoint)
      .doc(id)
      .get();

    return from(promise)
      .pipe(
        catchError(this._catchError)
      );
  }
}
