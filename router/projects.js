import Layout from '@/components/project/Layout.vue';
import List from '@/components/project/list/List.vue';
import EditProfile from '@/components/project/EditProfile.vue';
import Add from '@/components/project/add/Add.vue';

import details from './projects-details.js';

export default {
  path: '/projects',
  component: Layout,
  children: [
    {
      path: '',
      component: List,
    },
    {
      path: 'edit-profile',
      component: EditProfile,
    },
    {
      path: 'add',
      redirect: 'add/1',
    },
    {
      path: 'add/:step',
      component: Add,
      props: (route) => {
        return {
          step: parseInt(route.params.step),
        };
      },
    },
    details,
  ],
};
