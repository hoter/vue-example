import axios from 'axios';

import config from '@/config';

const _axios = axios.create({
  baseURL: config.host,
  withCredentials: true,
});

const git = {
  /**
   * Test git connection.
   * @param {object} data
   * @returns {Promise.<object>}
   */
  async test (data) {
    const config = {
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return await _axios.post('api/support/test_git', config);
  },
  /**
   * Test git http connection.
   * @param {string} protocol
   * @param {string} url
   * @param {string} tag
   * @param {string} username
   * @param {string} password
   * @returns {Promise.<object>}
   */
  async testHttp ({ protocol, url, tag, username, password }) {
    const data = {
      protocol,
      url,
      tag,
      username,
      password,
    };

    return await git.test(data);
  },
  /**
   * Test git ssh connection.
   * @param {string} protocol
   * @param {string} url
   * @param {string} tag
   * @param {string} key
   * @returns {Promise.<object>}
   */
  async testSsh ({ protocol, url, tag, key }) {
    const data = {
      protocol,
      url,
      tag,
      key,
    };

    return await git.test(data);
  },
};

export default git;
