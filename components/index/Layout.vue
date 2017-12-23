<template>
  <div>
    <x-header></x-header>
    <router-view class="content"></router-view>
    <x-footer></x-footer>
  </div>
</template>

<script>
  import Header from '@/components/common/Header';
  import Footer from '@/components/common/Footer';

  export default {
    name: 'index-layout',
    components: {
      'x-header': Header,
      'x-footer': Footer,
    },
  };
</script>

<style lang="scss" scoped>
  .header-content, .content, .footer-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 1170px;
  }

  header, footer {
    padding-left: 10px;
    padding-right: 10px;
  }

  .content {
    width: 533px;
    padding-top: 42px;
    min-height: calc(100vh - 73px - 42px - 41px);

    text-align: center;
  }
</style>
