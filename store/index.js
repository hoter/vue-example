import Vue from 'vue';
import Vuex from 'vuex';

import api from '@/api/index';

import blog from './blog';
import chat from './chat';
import user from './user';

import Website from '@/models/Website';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blog,
    chat,
    user,
  },
  state: {
    isProjectsLoaded: false,
    projects: [],
    newProject: new Website(),
    agencies: [],
  },
  mutations: {
    setProjectLoadedStatus (state, status) {
      state.isProjectsLoaded = status;
    },

    updateProject (state, project) {
      const existingProjectIndex = state.projects.findIndex((current) => {
        return current.nid === project.nid;
      });

      if (existingProjectIndex !== -1) {
        state.projects.splice(existingProjectIndex, 1, project);
      } else {
        state.projects.push(project);
      }
    },
    removeProject (state, nid) {
      const projectIndex = state.projects.findIndex((current) => {
        return current.nid === nid;
      });

      if (projectIndex !== -1) {
        state.projects.splice(projectIndex, 1);
      }
    },
    clearProjects (state) {
      state.projects = [];
    },

    updateNewProject (state, { field, value }) {
      state.newProject[field] = value;
    },

    updateAgencies (state, agencies) {
      state.agencies = agencies.slice(0);
    },
  },
  actions: {
    async updateProject (context, nid) {
      const userId = this.state.user.currentUser.userId;
      const website = await api.website.get(nid);
      const data = await api.website.getUpdates(userId, website.accessToken);
      website.projects = data.projects;
      website.libraries = data.libraries;

      website.projects.forEach(project => {
        if (project.recommended !== undefined) {
          project.hasUpdate = project.existing_version !== project.recommended;
          project.hasSecurityUpdate = project.hasOwnProperty('security updates');
        }
      });

      context.commit('updateProject', website);
    },
    async updateProjects (context) {
      context.commit('setProjectLoadedStatus', false);
      context.commit('clearProjects');

      if (context.getters.isLoggedIn) {
        await context.dispatch('updateUser');
      }

      const websites = await api.website.getAll();

      await Promise.all(websites.map(website =>
          context.dispatch('updateProject', website.nid)));

      context.commit('setProjectLoadedStatus', true);
    },

    async updateAgencies (context) {
      const agencies = await api.user.getAllAgencies();
      context.commit('updateAgencies', agencies);
    },
  },
});
