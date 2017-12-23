<template>
  <div class="content">
    <h2>Projects</h2>

    <template v-if="isProjectsLoaded">
      <template v-if="hasProjects">
        <router-link class="button" to="/projects/add">
          <span class="icon-plus-small">&nbsp;</span>
          Add project
        </router-link>

        <form @submit.prevent="filter" class="filter">
          <input type="text" id="filter"
                 placeholder="Project name"
                 v-model="filter" />

          <label for="filter">Filter</label>

          <div class="filter-icon">
            <span class="icon-search">&nbsp;</span>
          </div>
        </form>

        <list-table :projects="filteredProjects"></list-table>
      </template>
      <list-empty v-else></list-empty>
    </template>
    <div v-else class="loader"></div>
  </div>
</template>

<script>
  import Table from './Table';
  import Empty from './Empty';

  export default {
    name: 'project-list',
    components: {
      'list-table': Table,
      'list-empty': Empty,
    },
    props: {
      projects: { 'default': null, type: Array }
    },
    data () {
      return {
        filter: '',
      };
    },
    computed: {
      isProjectsLoaded () {
        return this.$store.state.isProjectsLoaded;
      },
      hasProjects () {
        return this.projects.length > 0;
      },
      filteredProjects () {
        return this.projects.filter((project) => {
          const name = project.name.toUpperCase();
          const filter = this.filter.toUpperCase();

          return name.indexOf(filter) !== -1;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../scss/loader.scss';

  .content {
    max-width: 639px;
    min-height: calc(100vh - 68px - 20px - 41px);

    padding-top: 68px;
    padding-bottom: 20px;
  }

  h2 {
    display: inline-block;
    margin-bottom: 40px;
    margin-right: 21px;

    letter-spacing: 1.05px;
  }

  .button {
    display: inline-block;
    padding: 12px 14px 8px 15px;

    background-color: #2ba6e1;
    border-radius: 3px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.42px;
    line-height: 15px;
    text-align: center;
    text-decoration: none;
    vertical-align: text-bottom;
  }

  .filter {
    position: relative;
    width: 307px;
    height: 43px;
    float: right;

    background-color: #ffffff;
    box-shadow: 3px 3px 15px rgba(232, 237, 250, 0.5);
    border-radius: 2px;
    overflow: hidden;

    input {
      box-sizing: border-box;
      padding-left: 18px;
      padding-right: 50px;

      background: transparent;
      border: none;
      width: 100%;
      height: 100%;
    }

    label {
      display: none;
    }

    .filter-icon {
      position: absolute;

      right: 0;
      top: 0;

      width: 45px;
      height: 43px;

      background-color: #8392a6;
      border: none;
      line-height: 43px;
      text-align: center;
    }
  }

  .loader {
    @include loader(176, 176, 176);

    display: block;
    font-size: 1rem;
    margin: 1rem auto;
  }
</style>
