<template>
  <div class="content">
    <ul class="breadcrumbs">
      <li><router-link to="/projects">Projects</router-link></li>
      <li>{{ website.name }}</li>
    </ul>

    <h2>{{ website.name }}</h2>

    <ul class="tabs">
      <li>
        <router-link :to="`/projects/${id}/overview`">
          Overview
        </router-link>
      </li>

      <li>
        <router-link :to="`/projects/${id}/libraries`">
          Libraries
        </router-link>
      </li>

      <li>
        <router-link :to="`/projects/${id}/settings`">
          Basic settings
        </router-link>
      </li>

      <li>
        <router-link :to="`/projects/${id}/site-config`">
          Site config
        </router-link>
      </li>
    </ul>

    <router-view :website="website"></router-view>
  </div>
</template>

<script>
  import Overview from './overview/Overview';

  export default {
    name: 'project-details',
    components: {
      'x-overview': Overview,
    },
    props: ['id'],
    computed: {
      website () {
        const _default = {
          name: '',
          drupal: {
            username: '',
            password: '',
          },
          git: {
            protocol: 'http',
            url: '',

            username: '',
            password: '',

            sshTitle: '',
            sshKey: '',
          },
          distribution: true,
          emails: 'all',
          url: '',
          framework: 'Drupal 7',
          projects: [],
        };

        const projects = this.$store.state.projects;

        if (projects === null) {
          return _default;
        }

        const website = projects.find(project =>
            project.nid === this.id);

        return website || _default;
      }
    },
  };
</script>

<style lang="scss" scoped>
  .content {
    min-width: 639px;
    min-height: calc(100vh - 29px - 20px - 41px);

    padding-top: 29px;
    padding-bottom: 20px;
  }

  ul.breadcrumbs {
    margin: 0;
    padding: 0;

    color: rgba(0, 0, 0, 0.87);
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.36px;
    line-height: 13px;
    list-style: none;

    li {
      display: inline-block;
    }

    li + li:before {
      content: '/';
      color: rgba(0, 0, 0, 0.54);

      margin-left: 14px;
      margin-right: 14px;
    }

    a, a:hover, a:focus, a:active {
      color: rgba(0, 0, 0, 0.54);
      opacity: 0.54;
      text-decoration: none;
    }
  }

  h2 {
    margin-top: 26px;
    margin-bottom: 45px;
  }

  ul.tabs {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;

      a {
        display: inline-block;
        padding: 0 10px 10px 10px;

        border-bottom: 2px solid transparent;
        color: rgba(0, 0, 0, 0.54);
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0.54px;
        line-height: 30px;
        text-transform: uppercase;
        text-decoration: none;

        &.router-link-exact-active {
          border-bottom: 2px solid #2ba6e1;
          color: #2ba6e1;
        }
      }
    }

    li + li {
      margin-left: 28px;
    }
  }
</style>
