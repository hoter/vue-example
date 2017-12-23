<template>
  <div>
    <div class="column-50">
      <h3>Basic Setup</h3>

      <ul>
        <li>
          <span class="property">Project Name</span>
          <span class="value">{{ name }}</span>
        </li>

        <li>
          <span class="property">Distribution update</span>
          <span class="value">{{ distribution }}</span>
        </li>

        <li>
          <span class="property">E-mails</span>
          <span class="value">{{ emails }}</span>
        </li>
      </ul>
    </div>

    <div class="column-50">
      <h3>Site Config</h3>

      <ul>
        <li>
          <span class="property">Framework</span>
          <span class="value">{{ framework }}</span>
        </li>

        <li>
          <span class="property">Site URL</span>
          <span class="value">{{ url }}</span>
        </li>
      </ul>
    </div>

    <a @click.prevent="prev" class="prev" href="#">
      <span class="icon-prev">&nbsp;</span>
      Prev step
    </a>

    <a @click.prevent="submit" class="next" href="#">
      Add project
      <span class="icon-next">&nbsp;</span>
    </a>
  </div>
</template>

<script>
  import api from '@/api/index';

  export default {
    name: 'projects-add-4',
    computed: {
      name () {
        return this.$store.state.newProject.name;
      },
      distribution () {
        const distribution = this.$store.state.newProject.distribution;
        return distribution ? 'Yes' : 'No';
      },
      emails () {
        const emails = this.$store.state.newProject.emails;

        if (emails === 'all') {
          return 'About all updates';
        } else if (emails === 'critical') {
          return 'About critical updates';
        }

        return emails;
      },
      url () {
        return this.$store.state.newProject.url;
      },
      framework () {
        return this.$store.state.newProject.framework;
      },
    },
    methods: {
      prev (e) {
        this.$router.push('/projects/add/3');
      },
      async submit (e) {
        const website = this.$store.state.newProject;
        const data = website.toDrupal();

        try {
          await api.website.create(data);
          await this.$store.dispatch('updateProjects');

          this.$router.push('/projects');
        } catch (error) {
          if (error.response !== undefined &&
              error.response !== null &&
              error.response.status === 422) {
            console.log(error.response.data.message);
          } else {
            console.log(JSON.stringify(error));
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  h3 {
    width: 150px;

    margin-bottom: 28px;

    border-bottom: 2px solid #ff4877;
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    text-transform: uppercase;
    letter-spacing: 0.18px;
  }

  ul {
    list-style: none;

    margin: 0;
    padding: 0;
  }

  li {
    margin-top: 0;
    margin-bottom: 24px;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.16px;
  }

  .property {
    margin-right: 20px;

    color: rgba(0, 0, 0, 0.54);
    font-weight: 500;
  }

  .value {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 400;
  }
</style>
