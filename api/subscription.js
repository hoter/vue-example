import webform from './webform';

export default {
  /**
   * Subscribe email.
   * @param {string} email
   */
  async subscribe ({ email }) {
    return await webform.submit({
      form: 'subscribe',
      data: { email },
    });
  },
};
