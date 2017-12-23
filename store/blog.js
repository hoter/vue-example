import api from '@/api/index';

export default {
  namespaced: true,
  state: {
    currentPage: 0,
    pages: [],
  },
  getters: {
    /**
     * Returns current page posts.
     * @param state
     * @returns {BlogPost[]}
     */
    posts (state) {
      return state.pages[state.currentPage] || [];
    },
  },
  mutations: {
    /**
     * @param state
     * @param {number} page
     */
    setCurrentPage (state, { page }) {
      state.currentPage = page;
    },
    /**
     * Replaces specified page posts.
     * @param state
     * @param {number} page
     * @param {BlogPost[]} posts
     */
    setPosts (state, { page, posts }) {
      state.pages.splice(page, 1, posts);
    },
  },
  actions: {
    /**
     * Loads specified page from api.
     * @param context
     * @param {number} page
     * @returns {Promise.<BlogPost[]>}
     */
    async loadPage (context, { page }) {
      const posts = await api.blog.getAll(page);
      context.commit('setPosts', { page, posts });
      return posts;
    },
    /**
     * Sets current page to specified and ensures it loaded.
     * @param context
     * @param {number} page
     * @returns {Promise.<BlogPost[]>}
     */
    async setPage (context, { page }) {
      let posts = context.state.pages[page];

      // Load specified page if not loaded already.
      if (posts === undefined || posts.length === 0) {
        posts = await context.dispatch('loadPage', { page });
      }

      // Set current page if posts loaded.
      if (posts !== undefined && posts.length > 0) {
        context.commit('setCurrentPage', { page });
      }

      return posts;
    },
    /**
     * Sets current page to previous and ensures it loaded.
     * @param context
     * @returns {Promise.<BlogPost[]>}
     */
    async prevPage (context) {
      const page = context.state.currentPage - 1;

      if (page < 0) {
        return [];
      }

      return await context.dispatch('setPage', { page });
    },
    /**
     * Sets current page to next and ensures it loaded.
     * @param context
     * @returns {Promise.<BlogPost[]>}
     */
    async nextPage (context) {
      const page = context.state.currentPage + 1;
      return await context.dispatch('setPage', { page });
    },
  },
};
