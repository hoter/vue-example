<template>
  <div>
    <div class="content-inner">
      <table>
        <thead>
        <tr>
          <th></th>
          <th>Projects</th>
          <th>Security updates</th>
          <th>Regular updates</th>
          <th>New updates</th>
        </tr>
        </thead>

        <tbody>
        <x-row v-for="project in projects"
               :project="project" :key="project.nid"></x-row>
        </tbody>
      </table>
    </div>

    <div class="total total--red">
      <p>Security updates</p>
      <p class="total-value">{{ securityUpdateCount }}</p>
    </div>

    <div class="total">
      <p>Regular updates</p>
      <p class="total-value">{{ updateCount }}</p>
    </div>

    <div class="total">
      <p>Total Projects</p>
      <p class="total-value">{{ projectCount }}</p>
    </div>
  </div>
</template>

<script>
  import Row from './TableRow';

  export default {
    name: 'project-list-table',
    components: {
      'x-row': Row,
    },
    props: {
      projects: { 'default': [], type: Array }
    },
    computed: {
      updateCount () {
        return this.projects.reduce((sum, project) => {
          const updates = project.projects.filter(project =>
              project.hasUpdate && !project.hasSecurityUpdate);

          return sum + updates.length;
        }, 0);
      },
      securityUpdateCount () {
        return this.projects.reduce((sum, project) => {
          const securityUpdates = project.projects.filter(project =>
              project.hasSecurityUpdate);

          return sum + securityUpdates.length;
        }, 0);
      },
      projectCount () {
        return this.projects.length;
      },
    },
  };
</script>

<style lang="scss" scoped>
  table {
    width: 100%;
    max-width: 903px;
    margin-bottom: 32px;

    background-color: #fafbff;
    border-collapse: collapse;
    box-shadow: 3px 3px 15px rgba(232, 237, 250, 0.5);
  }

  thead tr {
    height: 59px;
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

  .total {
    display: inline-block;
    width: 133px;
    height: 53px;
    padding: 25px 21px 25px 21px;

    background-color: #ffffff;
    box-shadow: 3px 3px 15px rgba(232, 237, 250, 0.5);
    border-radius: 2px;
    overflow: hidden;
    border-top: 3px solid #2ba6e1;

    & + & {
      margin-left: 22px;
    }

    p {
      margin-bottom: 16px;

      font-size: 16px;
      line-height: 16px;
    }

    .total-value {
      margin-bottom: 0;

      opacity: 0.87;
      color: #2ba6e1;
      font-size: 25px;
      font-weight: 700;
      line-height: 19px;
      text-transform: uppercase;
    }

    &--red {
      border-top: 3px solid #ff4877;

      .total-value {
        color: #ff4877;
      }
    }
  }
</style>
