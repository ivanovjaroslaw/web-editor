import BaseGateway from '../utils/base.gateway';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export default class RandomNameGateway extends BaseGateway {
  static baseUrl = 'https://randomuser.me/';
  static resourceUrl = 'api/';

  static getItem () {
    const promise = fetch(super.getCompleteResourceUrl(), {
      mode: 'cors',
      method: 'GET',
    });

    return super.transform(promise)
      .pipe(
        mergeMap(response => from(response.json())),
        map(response => {
          const fullNameObj = response.results[0].name;
          return `${fullNameObj.first} ${fullNameObj.last}`;
        }),
      );
  }
}
