<template>
  <div>
    <h2>Password reset</h2>

    <form @submit.prevent="submit">
      <text-field class="field"
                  name="username" :required="true"
                  title="Username" :showTitle="true"
                  v-model="username" :error="usernameError">
      </text-field>

      <button type="submit">
        Submit
        <span class="loader" v-show="isSubmitting">&nbsp;</span>
      </button>

      <p v-show="isSubmitted">
        If an account exists with these credentials,
        password reset instructions will be sent
        to the email associated with the account.
      </p>
    </form>
  </div>
</template>

<script>
  import TextField from '@/components/common/form/TextField';

  import api from '@/api/index';
  import store from '@/store';

  export default {
    name: 'password-reset-form',
    components: {
      'text-field': TextField,
    },
    data () {
      return {
        username: '',
        usernameError: null,
        isSubmitting: false,
        isSubmitted: false,
      };
    },
    async beforeRouteEnter (to, from, next) {
      const isLoggedIn = store.getters.isLoggedIn || await api.user.isLoggedIn();

      if (isLoggedIn) {
        next('/');
      } else {
        next();
      }
    },
    methods: {
      async submit (event) {
        if (this.isSubmitting) {
          return;
        }

        this.isSubmitting = true;

        const data = {
          name: this.username,
        };

        try {
          await api.user.passwordReset(data);

          this.isSubmitted = true;
        } catch (error) {
        }

        this.isSubmitting = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  form {
    width: 500px;
    padding-top: 20px;
    padding-bottom: 44px;
    margin-top: 39px;
    margin-bottom: 44px;

    box-shadow: -3px 3px 15px rgba(232, 237, 250, 0.5);
    border-radius: 2px;
    background-color: #fff;
  }

  .field {
    width: 320px;
    margin: 0 auto 24px auto;
  }

  button {
    width: 236px;
    height: 50px;
    margin-top: 20px;

    border: none;
    border-radius: 2px;
    background-color: #2ba6e1;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
  }

  p {
    margin: 40px 20px 0 20px;
  }
</style>

