export default class BaseService {
  static _catchError (error) {
    throw new Error(error);
  }
}
