import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {from, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {authProvider, storageProvider} from '../index';
import BaseService from '../utils/base.service';

export default class MessageResourceService extends BaseService {
  private static _key: string = 'chats';
  public documentId = null;

  public get resultEndpoint() {
    return `${MessageResourceService._key}/${this.documentId}/messages`;
  }

  public add(data: any) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    if (authProvider.currentUser === null) {
      throw new Error('User should be already authorized');
    }
    const userUid = authProvider.currentUser.uid;
    const promise = storageProvider
      .collection(this.resultEndpoint)
      .add({ ...data, timestamp, userUid });

    return from(promise)
      .pipe(
        catchError(this._catchError),
      );
  }

  public getList() {
    const promise = storageProvider
      .collection(this.resultEndpoint)
      .get();

    return from(promise)
      .pipe(
        catchError(this._catchError),
        mergeMap((docs: firebase.firestore.QuerySnapshot) => {
          const data: firebase.firestore.DocumentData[] = [];
          docs.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
            data.push({ ...doc.data(), id: doc.id });
          });

          return of(data);
        }),
      );
  }

  private _validate() {
    if (!this.documentId) {
      throw new Error('documentId should be specified');
    }
  }
}
