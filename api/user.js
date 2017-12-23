import axios from 'axios';

import config from '@/config';

import User from '@/models/User';

const _axios = axios.create({
  baseURL: config.host,
  withCredentials: true,
});

/**
 * Creates user from drupal view response.
 * @param {string} uid
 * @param {string} name
 * @param {string} mail
 * @param {string} role
 * @param {string} userId Support Server UserId.
 * @param {string} accountType
 * @param {string} country
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} picture
 */
function toUser ({ uid, name, mail, role, userId,
                   accountType, country, firstName, lastName, picture }) {
  const user = new User();
  user.uid = Number.parseInt(uid);
  user.name = name;
  user.mail = mail;
  user.role = role;

  user.userId = userId;

  user.accountType = accountType;
  user.country = country;
  user.firstName = firstName;
  user.lastName = lastName;
  user.picture = config.host + picture;

  return user;
}

const user = {
  /**
   * Registers new user.
   * @param {object} data
   * @returns {Promise.<object>}
   */
  async register (data) {
    const isLoggedIn = await user.isLoggedIn();

    if (isLoggedIn) {
      await user.logout();
    }

    const config = {
      headers: { 'X-CSRF-Token': await user.getToken() },
    };

    return await _axios.post('user/register?_format=json', data, config);
  },
  /**
   * Edits user.
   * @param {number} uid
   * @param {object} data
   * @returns {Promise.<object>}
   */
  async edit (uid, data) {
    const config = {
      headers: { 'X-CSRF-Token': await user.getToken() },
    };

    return await _axios.patch(`user/${uid}?_format=json`, data, config);
  },
  /**
   * Gets all users.
   * @returns {Promise.<User[]>}
   */
  async getAll () {
    const response = await _axios.get('api/user/all?_format=json');
    return response.data.map(toUser);
  },
  /**
   * Gets all agencies.
   * @returns {Promise.<User[]>}
   */
  async getAllAgencies () {
    const response = await _axios.get('api/user/agency?_format=json');
    return response.data.map(toUser);
  },
  /**
   * Gets user by uid.
   * @param {number} id
   * @returns {Promise.<User>}
   */
  async get (id) {
    const response = await _axios.get(`api/user/${id}?_format=json`);
    return toUser(response.data);
  },
  /**
   * Gets current user.
   * @returns {Promise.<User>}
   */
  async getCurrent () {
    const response = await _axios.get('api/user/current?_format=json');
    return toUser(response.data[0]);
  },
  /**
   * Requests password reset.
   * @param {object} data
   * @returns {Promise.<object>}
   */
  async passwordReset (data) {
    return await _axios.post('api/support/reset_password', data);
  },
  /**
   * Checks is user logged in.
   * @returns {Promise.<boolean>}
   */
  async isLoggedIn () {
    const response = await _axios.get('user/login_status?_format=json');
    return response.data === 1;
  },
  /**
   * Logs in user.
   * @param {string} name
   * @param {string} pass
   * @returns {Promise.<number>}
   */
  async login ({ name, pass }) {
    const isLoggedIn = await user.isLoggedIn();

    if (isLoggedIn) {
      await user.logout();
    }

    const response = await _axios.post('user/login?_format=json', { name, pass });
    return response.data.current_user.uid;
  },
  /**
   * Logs out user.
   * @returns {Promise.<void>}
   */
  async logout () {
    // Drupal always returns 403 on logout.
    try {
      await _axios.get('user/logout');
    } catch (error) {
      if (error.response.status !== 403) {
        throw error;
      }
    }
  },
  /**
   * Gets CSRF token.
   * @returns {Promise.<string>}
   */
  async getToken () {
    const response = await _axios.get('rest/session/token');
    return response.data;
  },
};

export default user;
