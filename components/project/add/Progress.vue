<template>
  <ul class="progress">
    <li :class="progressClass(1)">
      <span class="circle">1</span>
      Basic setup
    </li>

    <li class="line"><span>&nbsp;</span></li>

    <li :class="progressClass(2)">
      <span class="circle">2</span>
      Connection
    </li>

    <li class="line"><span>&nbsp;</span></li>

    <li :class="progressClass(3)">
      <span class="circle">3</span>
      Site Config
    </li>

    <li class="line"><span>&nbsp;</span></li>

    <li :class="progressClass(4)">
      <span class="circle">4</span>
      Summary
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'add-project-progress',
    props: ['step'],
    methods: {
      progressClass (step) {
        if (this.step > step) {
          return 'completed';
        }

        return (this.step === step) ? 'active' : '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  ul.progress {
    display: flex;
    justify-content: space-between;
    margin: 0 0 52px 0;
    padding: 0;

    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.18px;
    list-style: none;
    line-height: 30px;
  }

  li {
    display: inline-block;

    color: rgba(0, 0, 0, 0.54);

    &:not(:first-child) {
      margin-left: 4px;
    }

    span.circle {
      display: inline-block;
      width: 26px;
      height: 26px;

      background-color: #b3b7bb;
      border: 2px solid transparent;
      border-radius: 50%;
      color: #ffffff;
      line-height: 26px;
      text-align: center;
      vertical-align: middle;
    }

    &.completed {
      color: #75cff0;

      span.circle {
        background-color: transparent;
        border: 2px solid #75cff0;
        color: #75cff0;
      }

      + li.line span {
        background-color: #75cff0;
      }
    }

    &.active {
      color: #2ba6e1;

      span.circle {
        background-color: #2ba6e1;
      }
    }

    &.line {
      flex-grow: 1;

      span {
        display: inline-block;
        width: 100%;
        height: 1px;
        vertical-align: middle;

        background-color: #b3b7bb;
      }
    }
  }
</style>
