import axios from 'axios';

import config from '@/config';

import user from './user';

const _axios = axios.create({
  baseURL: config.host,
  withCredentials: true,
});

export default {
  /**
   * Creates node.
   * @param {string} type
   * @param {object} data
   * @returns {Promise.<object>}
   */
  async create (type, data) {
    const requestData = {
      type: [{ target_id: type }],
      ...data,
    };

    const requestConfig = {
      headers: { 'X-CSRF-Token': await user.getToken() },
    };

    return await _axios.post('entity/node?_format=json',
        requestData, requestConfig);
  },
  /**
   * Edits node.
   * @param {number} nid
   * @param {string} type
   * @param {object} data
   * @returns {Promise.<object>}
   */
  async edit (nid, type, data) {
    const requestData = {
      type: [{ target_id: type }],
      ...data,
    };

    const requestConfig = {
      headers: { 'X-CSRF-Token': await user.getToken() },
    };

    return await _axios.patch(`node/${nid}?_format=json`,
        requestData, requestConfig);
  },
  /**
   * Deletes node.
   * @param nid
   * @returns {Promise.<object>}
   */
  async delete (nid) {
    const requestConfig = {
      headers: { 'X-CSRF-Token': await user.getToken() },
    };

    return await _axios.delete(`node/${nid}?_format=json`,
        requestConfig);
  },
  /**
   * Gets node by id.
   * @param {number} id
   * @returns {Promise.<object>}
   */
  async get (id) {
    const response = await _axios.get(`node/${id}?_format=json`);
    return response.data;
  },
};
