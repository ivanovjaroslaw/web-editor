import BaseGateway from '../utils/base.gateway';
import 'firebase/firestore';

export default class MessageGateway extends BaseGateway {
  static resourceUrl = 'chats/{documentId}/messages';
}
