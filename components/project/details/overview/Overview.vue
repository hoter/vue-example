<template>
  <div class="content-inner">
    <x-header :updatesCount="updatesCount"
              :securityUpdatesCount="securityUpdatesCount"
              :updates="updates" :website="website">
    </x-header>

    <x-table :accessToken="website.accessToken"
             :updates="updates" :updated="updated">
    </x-table>
  </div>
</template>

<script>
  import Header from './Header';
  import Table from './Table';

  export default {
    name: 'project-details-overview',
    components: {
      'x-header': Header,
      'x-table': Table,
    },
    props: ['website'],
    computed: {
      updates () {
        return this.website.projects.filter(project => project.hasUpdate);
      },
      securityUpdates () {
        return this.website.projects.filter(project => project.hasSecurityUpdate);
      },
      updated () {
        return this.website.projects.filter(project => !project.hasUpdate);
      },
      updatesCount () {
        return this.updates.length;
      },
      securityUpdatesCount () {
        return this.securityUpdates.length;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content-inner {
    padding: 0;

    box-shadow: 2px 4px 15px rgba(232, 237, 250, 0.5);
    background-color: #ffffff;
  }
</style>
