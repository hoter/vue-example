<template>
  <form class="content-inner" @submit.prevent="submit">
    <h3>Confirm delete</h3>
    <p>Are you sure you want to delete {{ website.name }}?</p>

    <div class="buttons">
      <button @click.prevent="cancel">Cancel</button>
      <button type="submit">Ok</button>
    </div>
  </form>
</template>

<script>
  import api from '@/api/index';

  export default {
    name: 'project-details-confirm-delete',
    props: ['website'],
    methods: {
      cancel () {
        this.$router.back();
      },
      async submit () {
        try {
          await api.website.delete(this.website.nid);
          await this.$store.commit('removeProject', this.website.nid);

          this.$router.push('/projects');
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content-inner {
    padding: 42px 43px 42px 43px;

    box-shadow: 2px 4px 15px rgba(232, 237, 250, 0.5);
    background-color: #ffffff;
  }

  h3 {
    margin-bottom: 25px;
  }

  p {
    line-height: 30px;
  }

  .buttons {
    margin-top: 34px;
    text-align: right;
  }

  button {
    background: transparent;
    border: none;
    color: rgba(0, 0, 0, 0.54);
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.54px;

    &[type=submit] {
      color: #2ba6e1;
    }

    & + & {
      margin-left: 53px;
    }
  }
</style>
