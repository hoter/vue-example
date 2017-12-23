import Details from '@/components/project/details/Details.vue';
import Overview from '@/components/project/details/overview/Overview.vue';
import Libraries from '@/components/project/details/Libraries.vue';
import BasicSettings from '@/components/project/details/BasicSettings.vue';
import ConfirmDelete from '@/components/project/details/ConfirmDelete.vue';
import SiteConfig from '@/components/project/details/SiteConfig.vue';

export default {
  path: ':id',
  component: Details,
  props: (route) => {
    return {
      id: parseInt(route.params.id),
    };
  },
  children: [
    {
      path: '',
      redirect: 'overview',
    },
    {
      path: 'overview',
      component: Overview,
    },
    {
      path: 'libraries',
      component: Libraries,
    },
    {
      path: 'settings',
      component: BasicSettings,
    },
    {
      path: 'delete',
      component: ConfirmDelete,
    },
    {
      path: 'site-config',
      component: SiteConfig,
    },
  ],
};
