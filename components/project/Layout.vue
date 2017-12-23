<template>
  <div>
    <x-menu></x-menu>

    <div class="content-wrapper">
      <router-view class="content" :projects="projects"></router-view>

      <x-footer></x-footer>
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/common/Menu';
  import Footer from '@/components/common/Footer';

  export default {
    name: 'projects',
    components: {
      'x-menu': Menu,
      'x-footer': Footer,
    },
    computed: {
      projects () {
        return this.$store.state.projects;
      },
    },
    async created () {
      await Promise.all([
        this.$store.dispatch('updateProjects'),
        this.$store.dispatch('updateAgencies'),
      ]);
    }
  };
</script>

<style lang="scss" scoped>
  aside {
    position: fixed;

    width: 281px;
    height: 100vh;
  }

  .content-wrapper {
    padding: 0 60px 0 60px;
    margin-left: 281px;
  }
</style>
