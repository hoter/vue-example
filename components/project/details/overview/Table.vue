<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Type</th>
        <th>Version</th>
      </tr>
    </thead>

    <tbody>
      <x-row v-for="update in updates"
             :key="update.name" :update="update"
             :accessToken="accessToken">
      </x-row>

      <x-row v-for="update in updated"
             :key="update.name" :update="update"
             :accessToken="accessToken">
      </x-row>
    </tbody>
  </table>
</template>

<script>
  import Row from './TableRow';

  export default {
    name: 'project-details-overview-table',
    components: {
      'x-row': Row,
    },
    props: {
      accessToken: { 'default': '', type: String },
      updates: { 'default': [], type: Array },
      updated: { 'default': [], type: Array },
    },
  };
</script>

<style lang="scss" scoped>
  table {
    width: 100%;
    max-width: 903px;

    background-color: #fafbff;
    border-collapse: collapse;
    box-shadow: 3px 3px 15px rgba(232, 237, 250, 0.5);
  }

  tr {
    height: 56px;
  }

  th {
    opacity: 0.87;
    color: #505464;
    font-size: 14px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 0.42px;
    text-align: left;
  }

  th:first-child {
    width: 40px;
    text-align: center;
  }
</style>
