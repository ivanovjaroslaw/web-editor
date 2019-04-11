import BaseGateway from '../utils/base.gateway';
import 'firebase/firestore';

export default class UserGateway extends BaseGateway {
  static resourceUrl = 'users';
}
