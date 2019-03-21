import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { storageProvider } from '../index';
import BaseService from '../utils/base.service';

export default class DocumentResourceService extends BaseService {
  private static _key: string = 'documents';

  public get resultEndpoint() {
    return DocumentResourceService._key;
  }

  public add(data: any) {
    const promise = storageProvider
      .collection(this.resultEndpoint)
      .add(data);

    return from(promise)
      .pipe(
        catchError(this._catchError),
      );
  }

  public save(id: string, data: any) {
    if (!id) {
      throw new Error('Id is missed for saving data');
    }

    const promise = storageProvider
      .collection(this.resultEndpoint)
      .doc(id)
      .set(data);

    return from(promise)
      .pipe(
        catchError(this._catchError),
      );
  }

  public getItem(id: string) {
    const promise = storageProvider
      .collection(this.resultEndpoint)
      .doc(id)
      .get();

    return from(promise)
      .pipe(
        catchError(this._catchError),
      );
  }
}
