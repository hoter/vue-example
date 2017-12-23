import axios from 'axios';

import config from '@/config';

import node from './node';

import Website from '@/models/Website';

const _axios = axios.create({
  baseURL: config.host,
  withCredentials: true,
});

export default {
  /**
   * Creates website.
   * @param {object} data
   * @returns {Promise.<object>}
   */
  async create (data) {
    return await node.create('website', data);
  },
  /**
   * Edits website.
   * @param {number} nid
   * @param {object} data
   * @returns {Promise.<object>}
   */
  async edit (nid, data) {
    return await node.edit(nid, 'website', data);
  },
  /**
   * Deletes website.
   * @param {number} nid
   * @returns {Promise.<object>}
   */
  async delete (nid) {
    return await node.delete(nid);
  },
  /**
   * Gets website by nid.
   * @param {number} id
   * @returns {Promise.<Website>}
   */
  async get (id) {
    const data = await node.get(id);
    return Website.createFromDrupal(data);
  },
  /**
   * Gets all websites for current user.
   * @returns {Promise.<Website[]>}
   */
  async getAll () {
    const responses = await Promise.all([
      _axios.get('api/user_websites'),
      _axios.get('api/agency_websites'),
    ]);

    const data = responses.reduce((acc, curr) => acc.concat(curr.data), []);
    return data.map(Website.createFromDrupal);
  },
  /**
   * Gets available updates for website.
   * @param {string} userId
   * @param {string} accessToken
   * @returns {Promise.<{projects: Array, libraries: Array}>}
   */
  async getUpdates (userId, accessToken) {
    const response = await _axios.get(`api/support/${userId}/${accessToken}`);
    const data = response.data;

    return {
      projects: data.items ? Object.values(data.items) : [],
      libraries: data.libraries ? Object.values(data.libraries) : [],
    };
  },
  /**
   * Applies update to website module.
   * @param {string} userId
   * @param {string} accessToken
   * @param {string} module
   * @returns {Promise.<object>}
   */
  async applyUpdate (userId, accessToken, module) {
    return await _axios.post(`api/support/${userId}/${accessToken}/apply-update/${module}`);
  },
};
