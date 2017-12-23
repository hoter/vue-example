import api from '@/api/index';

export default {
  state: {
    currentUser: null,
  },
  getters: {
    /**
     * Checks is current user logged in.
     * @param state
     * @return {boolean}
     */
    isLoggedIn (state) {
      return state.currentUser !== null;
    },
    /**
     * Checks is current user admin.
     * @param state
     * @return {boolean}
     */
    isAdmin (state) {
      if (state.currentUser === null) {
        return false;
      }

      return state.currentUser.isAdmin;
    },
  },
  mutations: {
    /**
     * Replaces current user.
     * @param state
     * @param {User} user
     */
    setUser (state, { user }) {
      state.currentUser = user;
    },
  },
  actions: {
    /**
     * Logs in user.
     * @param context
     * @param {string} name
     * @param {string} pass
     * @return {Promise.<void>}
     */
    async login (context, { name, pass }) {
      const uid = await api.user.login({ name, pass });
      const user = await api.user.get(uid);
      context.commit('setUser', { user });
    },
    /**
     * Logs out current user.
     * @param context
     * @return {Promise.<void>}
     */
    async logout (context) {
      await api.user.logout();
      context.commit('setProjectLoadedStatus', false);
      context.commit('clearProjects');
      context.commit('setUser', { user: null });
    },
    /**
     * Updates current user state from backend.
     * @param context
     * @return {Promise.<void>}
     */
    async updateUser (context) {
      const user = await api.user.getCurrent();
      context.commit('setUser', { user });
    },
  },
};
