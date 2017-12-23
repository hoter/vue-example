import axios from 'axios';

import config from '@/config';
import store from '@/store';

import node from './node';

import ChatMessage from '@/models/ChatMessage';

const _axios = axios.create({
  baseURL: config.host,
  withCredentials: true,
});

/**
 * Creates chat message from drupal view response.
 * @param {string} nid
 * @param {string} author
 * @param {string} conversation
 * @param {string} time
 * @param {string} body
 */
function toChatMessage ({ nid, author, conversation, time, body }) {
  const message = new ChatMessage();
  message.nid = Number.parseInt(nid);
  message.author = author;
  message.conversation = conversation;
  message.time = Date.parse(time);
  message.body = body;

  return message;
}

export default {
  /**
   * Creates chat message on backend.
   * @param {string} message
   * @param {number} uid
   * @returns {Promise.<object>}
   */
  async create (message, uid) {
    const _uid = uid || store.state.user.currentUser.uid;

    const requestData = {
      title: [{ value: 'Message' }],
      field_user: [{ target_id: _uid }],
      field_body: [{ value: message }],
    };

    return await node.create('chat_message', requestData);
  },
  /**
   * Gets all chat messages for current user.
   * @returns {Promise.<ChatMessage[]>}
   */
  async getAll () {
    const response = await _axios.get('api/chat?_format=json');
    return response.data.map(toChatMessage);
  },
  /**
   * Gets all chat messages for specified user.
   * @param {number} uid
   * @returns {Promise.<ChatMessage[]>}
   */
  async getAllFromUser (uid) {
    const response = await _axios.get(`api/chat/${uid}?_format=json`);
    return response.data.map(toChatMessage);
  },
};
