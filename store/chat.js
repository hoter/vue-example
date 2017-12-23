import api from '@/api/index';

// eslint-disable-next-line no-unused-vars
import ChatMessage from '@/models/ChatMessage';

export default {
  namespaced: true,
  state: {
    messages: [],
  },
  mutations: {
    /**
     * Replaces messages.
     * @param state
     * @param {ChatMessage[]} messages
     */
    setMessages (state, { messages }) {
      state.messages = messages;
    },
    /**
     * Adds message.
     * @param state
     * @param {ChatMessage} message
     */
    addMessage (state, { message }) {
      state.messages.push(message);
    },
  },
  actions: {
    /**
     * Loads all messages for current user from api.
     * @param context
     * @returns {Promise.<ChatMessage[]>}
     */
    async loadMessages (context) {
      const messages = await api.chat.getAll();
      context.commit('setMessages', { messages });
      return messages;
    },
    /**
     * Loads all messages for specified user from api.
     * @param context
     * @param {number} uid
     * @returns {Promise.<ChatMessage[]>}
     */
    async loadMessagesForUser (context, { uid }) {
      const messages = await api.chat.getAllFromUser(uid);
      context.commit('setMessages', { messages });
      return messages;
    },
    /**
     * Sends message and reloads messages.
     * @param context
     * @param {string} message
     * @returns {Promise.<ChatMessage[]>}
     */
    async sendMessage (context, { message }) {
      await api.chat.create(message);
      return await context.dispatch('loadMessages');
    },
    /**
     * Sends message for specified user and reloads messages.
     * @param context
     * @param {string} message
     * @param {number} uid
     * @returns {Promise.<ChatMessage[]>}
     */
    async sendMessageForUser (context, { message, uid }) {
      await api.chat.create(message, uid);
      return await context.dispatch('loadMessagesForUser', { uid });
    },
  },
};
