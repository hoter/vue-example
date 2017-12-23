import axios from 'axios';

import user from './user';

import config from '@/config';

const _axios = axios.create({
  baseURL: config.host,
  withCredentials: true,
});

export default {
  /**
   * Creates file
   * @param {number} uid
   * @param {string} filename
   * @param {string} base64Content
   * @returns {Promise.<object>}
   */
  async create (uid, filename, base64Content) {
    const requestData = {
      _links: {
        type: {
          href: config.host + '/rest/type/file/image',
        },
      },
      type: [{target_id: 'image'}],
      filename: [{value: filename}],
      uid: [{target_id: uid}],
      uri: [{value: 'public://' + filename}],
      data: [{value: base64Content.replace(/data:image\/.+;base64,/gi, '')}],
    };

    const requestConfig = {
      headers: {
        'X-CSRF-Token': await user.getToken(),
        'Content-Type': 'application/hal+json',
      },
    };

    return await _axios.post('entity/file?_format=hal_json',
        requestData, requestConfig);
  },
  /**
   * Gets file content uri by id.
   * @param {number} id
   * @returns {Promise.<string>}
   */
  async getUri (id) {
    const response = await _axios.get(`file/${id}?_format=json`);
    const url = response.data.uri[0].value.replace('public://', '');
    return config.host + config.filesRootUrl + url;
  },
};
