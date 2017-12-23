<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    async created () {
      await this.$store.dispatch('updateUser');
    },
  };
</script>

<style lang="scss">
  @import '../scss/main';
</style>
