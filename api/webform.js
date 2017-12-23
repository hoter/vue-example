import axios from 'axios';

import config from '@/config';

import user from './user';

const _axios = axios.create({
  baseURL: config.host,
  withCredentials: true,
});

export default {
  /**
   * Submit webform.
   * @param {string} form
   * @param {object} data
   */
  async submit ({ form, data }) {
    const requestData = {
      webform_id: form,
      ...data,
    };

    const requestConfig = {
      headers: {
        'X-CSRF-Token': await user.getToken(),
      },
    };

    const response = await _axios.post('webform_rest/submit?_format=json',
        requestData, requestConfig);

    const responseData = response.data;

    if (responseData.error) {
      throw responseData.error;
    }

    return responseData;
  },
};
