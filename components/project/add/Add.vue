<template>
  <div class="content">
    <ul class="breadcrumbs">
      <li><router-link to="/projects">Projects</router-link></li>
      <li>Add project</li>
    </ul>

    <h2>New project</h2>

    <div class="content-inner">
      <x-progress :step="step"></x-progress>

      <step-1 v-if="step === 1"></step-1>
      <step-2 v-else-if="step === 2"></step-2>
      <step-3 v-else-if="step === 3"></step-3>
      <step-4 v-else-if="step === 4"></step-4>
    </div>
  </div>
</template>

<script>
  import Progress from './Progress';
  import Step1 from './Step1';
  import Step2 from './Step2';
  import Step3 from './Step3';
  import Step4 from './Step4';

  export default {
    name: 'add-project',
    components: {
      'x-progress': Progress,
      'step-1': Step1,
      'step-2': Step2,
      'step-3': Step3,
      'step-4': Step4,
    },
    props: ['step'],
  };
</script>

<style lang="scss" scoped>
  .content {
    max-width: 803px;
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
    margin-bottom: 40px;
  }

  .content-inner {
    position: relative;
    padding: 33px 38px 41px 41px;
    min-height: 408px;

    box-shadow: 2px 4px 15px rgba(232, 237, 250, 0.5);
    background-color: #ffffff;

    & /deep/ {
      & .prev, & .next {
        position: absolute;
        bottom: 41px;

        font-weight: 700;
        letter-spacing: 0.54px;
        text-decoration: none;
        text-transform: uppercase;
      }

      & .prev {
        left: 41px;

        color: #757575;

        .icon-prev {
          margin-right: 14px;
        }
      }

      & .next {
        right: 38px;

        color: #2ba6e1;

        .icon-next {
          margin-left: 14px;
        }
      }
    }
  }
</style>
