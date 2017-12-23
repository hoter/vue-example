export default class ChatMessage {
  constructor () {
    this.nid = 0;
    this.author = '';
    this.conversation = '';
    this.time = Date.now();
    this.body = '';
  }
};
