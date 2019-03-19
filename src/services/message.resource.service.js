import { authProvider, storageProvider } from '../index';
import SingletonMixin from '../utils/singleton.mixin';
import BaseService from '../utils/base.service';
import { from, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default class MessageResourceService extends SingletonMixin(BaseService) {
  static key = 'chats';
  documentId = null;

  get resultEndpoint () {
    return `${MessageResourceService.key}/${this.documentId}/messages`;
  }

  add (data) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const userUid = authProvider.currentUser.uid;
    const promise = storageProvider
      .collection(this.resultEndpoint)
      .add({ ...data, timestamp, userUid });

    return from(promise)
      .pipe(
        catchError(this._catchError)
      );
  }

  getList () {
    const promise = storageProvider
      .collection(this.resultEndpoint)
      .get();

    return from(promise)
      .pipe(
        catchError(this._catchError),
        mergeMap(docs => {
          const data = [];
          docs.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });

          return of(data);
        })
      );
  }

  _validate () {
    if (!this.documentId) {
      throw new Error('documentId should be specified');
    }
  }
}
