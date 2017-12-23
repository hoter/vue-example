import webform from './webform';

export default {
  /**
   * Submit contact form.
   * @param {string} name
   * @param {string} email
   * @param {string} message
   */
  async submit ({ name, email, message }) {
    return await webform.submit({
      form: 'contact',
      data: { name, email, message },
    });
  },
};
