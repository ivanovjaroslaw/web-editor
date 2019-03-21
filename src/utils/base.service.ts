import { throwError } from 'rxjs';

export default class BaseService {
  private static _instance: BaseService;

  constructor() {
    if (BaseService._instance) {
      return BaseService._instance;
    }

    BaseService._instance = this;
  }

  protected _catchError(error: any) {
    return throwError(error);
  }
}
