<template>
  <div class="content-inner">
    <h3>You have no projects yet</h3>

    <p>Let’s create a new project together!</p>

    <router-link class="button" to="/projects/add">
      <span class="icon-plus">&nbsp;</span>
      Add project
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'project-list-empty',
  };
</script>

<style lang="scss" scoped>
  .content-inner {
    padding: 52px 42px 50px 42px;

    box-shadow: 2px 4px 15px rgba(232, 237, 250, 0.5);
    background-color: #ffffff;
  }

  h3 {
    margin-bottom: 15px;

    letter-spacing: 0.75px;
    line-height: 30px;
  }

  p {
    margin-bottom: 28px;

    letter-spacing: 0.54px;
    line-height: 30px;
  }

  .button {
    display: inline-block;
    padding: 12px 28px 8px 30px;

    background-color: #2ba6e1;
    border-radius: 3px;
    color: #ffffff;
    font-weight: 400;
    letter-spacing: 0.54px;
    line-height: 30px;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
  }
</style>
