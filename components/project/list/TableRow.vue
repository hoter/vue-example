<template>
  <tr @click.prevent="$router.push(`/projects/${project.nid}`)">
    <td><span :class="statusIcon">&nbsp;</span></td>
    <td>{{ project.name }}</td>
    <td>{{ securityUpdateCount }}</td>
    <td>{{ updateCount }}</td>
    <td>
      <a href="#" @click.prevent.stop="checkUpdates">Check</a>
      <span class="loader" v-show="isCheckingUpdates">&nbsp;</span>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'project-list-table-row',
    props: {
      project: {
        'default': {
          name: '',
          projects: [],
        },
        type: Object,
      }
    },
    data () {
      return {
        isCheckingUpdates: false,
      };
    },
    computed: {
      statusIcon () {
        return 'icon-check';
      },
      updateCount () {
        return this.project.projects.filter(project =>
            project.hasUpdate && !project.hasSecurityUpdate).length;
      },
      securityUpdateCount () {
        return this.project.projects.filter(project =>
            project.hasSecurityUpdate).length;
      },
    },
    methods: {
      async checkUpdates () {
        if (this.isCheckingUpdates) {
          return;
        }

        this.isCheckingUpdates = true;

        await this.$store.dispatch('updateProject', this.project.nid);

        this.isCheckingUpdates = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  tr {
    height: 51px;

    cursor: pointer;

    &:hover {
      background-image: linear-gradient(to top, rgba(249, 253, 255, 0) 0%, rgba(245, 249, 254, 0.57) 57%, #eef5ff 100%);
    }
  }

  td {
    border-top: 1px solid #e3e9fa;

    &, a {
      color: #505464;
      font-size: 16px;
      font-weight: 300;
      line-height: 48px;
      letter-spacing: 0.48px;
    }

    a {
      text-decoration-style: dashed;
    }
  }

  td:first-child {
    width: 40px;
    text-align: center;
  }
</style>
