<template>
  <div>
    <h3>To connect your site to DruLabs:</h3>

    <ol>
      <li>
        <a :href="agentModuleUrl" class="strong">Install DruLabs module</a>
        on your web site 
      </li>

      <li>
        <strong class="underline-dashed">Copy User ID</strong>
        to the module’s settings page
       </li>

      <li>
        <strong class="underline-dashed">Copy Access token</strong>
        to the module’s settings page
      </li>
    </ol>

    <a @click.prevent="prev" class="prev" href="#">
      <span class="icon-prev">&nbsp;</span>
      Prev step
    </a>

    <a @click.prevent="next" class="next" href="#">
      Next step
      <span class="icon-next">&nbsp;</span>
    </a>
  </div>
</template>

<script>
  import config from '@/config';

  export default {
    name: 'add-project-2',
    computed: {
      agentModuleUrl () {
        return config.host + config.filesRootUrl + config.clientModule;
      },
    },
    methods: {
      prev () {
        this.$router.push('/projects/add/1');
      },
      next () {
        this.$router.push('/projects/add/3');
      },
    },
  };
</script>

<style lang="scss" scoped>
  h3 {
    margin-top: 52px;
  }

  ol {
    margin: 0;

    color: #212121;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 0.18px;
  }

  li {
    margin-bottom: 26px;
  }

  a.strong {
    color: #212121;
    font-weight: 400;
    line-height: 14px
  }

  .underline {
    text-decoration: underline;
  }

  .underline-dashed {
    text-decoration: underline;
    text-decoration-style: dashed;
  }
</style>
