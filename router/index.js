import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

import Layout from '@/components/index/Layout.vue';
import SignUp from '@/components/index/SignUp.vue';
import LogIn from '@/components/index/LogIn.vue';
import Index from '@/components/index/Index.vue';
import About from '@/components/index/About.vue';
import Blog from '@/components/index/Blog.vue';
import Contact from '@/components/index/Contact.vue';
import PasswordReset from '@/components/index/PasswordReset.vue';
import Chat from '@/components/index/support/Chat.vue';

import projects from './projects.js';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      meta: { allowNonAuthorized: true },
      children: [
        {
          path: '',
          component: Index,
          meta: { allowNonAuthorized: true },
        },
        {
          path: 'register',
          component: SignUp,
          meta: { allowNonAuthorized: true },
        },
        {
          path: 'login',
          component: LogIn,
          meta: { allowNonAuthorized: true },
        },
        {
          path: 'about',
          component: About,
          meta: { allowNonAuthorized: true },
        },
        {
          path: 'blog',
          component: Blog,
          meta: { allowNonAuthorized: true },
        },
        {
          path: 'contact',
          component: Contact,
          meta: { allowNonAuthorized: true },
        },
        {
          path: 'password_reset',
          component: PasswordReset,
          meta: { allowNonAuthorized: true },
        },
        {
          path: 'support',
          component: Chat,
        },
        {
          path: 'support/:uid',
          component: Chat,
        },
      ],
    },
    projects,
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthNotRequired = to.matched.every(record =>
      record.meta.allowNonAuthorized);

  if (isAuthNotRequired || store.getters.isLoggedIn) {
    next();
    return;
  }

  next('/login');
});

export default router;
