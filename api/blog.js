import axios from 'axios';

import config from '@/config';

import BlogPost from '@/models/BlogPost';

const _axios = axios.create({
  baseURL: config.host,
  withCredentials: true,
});

export default {
  /**
   * Gets all blog posts from specified page.
   * @param {number} page
   * @returns {Promise.<BlogPost[]>}
   */
  async getAll (page) {
    const _page = page || 0;
    const response = await _axios.get('api/blog?_format=json&page=' + _page);
    return response.data.map(BlogPost.createFromDrupal);
  },
};
