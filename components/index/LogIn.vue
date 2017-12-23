<template>
  <div>
    <h2>Log in</h2>

    <form @submit.prevent="submit">
      <text-field class="field"
                  name="username" :required="true"
                  title="Username" :showTitle="true"
                  v-model="username" :error="usernameError">
      </text-field>

      <text-field class="field" type="password"
                  name="password" :required="true"
                  title="Password" :showTitle="true"
                  v-model="password" :error="passwordError">
      </text-field>

      <button type="submit">
        Log in
        <span class="loader" v-show="isSubmitting">&nbsp;</span>
      </button>

      <p>
        <router-link to="/password_reset">
          Reset password
        </router-link>
      </p>
    </form>
  </div>
</template>

<script>
  import TextField from '@/components/common/form/TextField';

  import api from '@/api/index';
  import store from '@/store';

  export default {
    name: 'login-form',
    components: {
      'text-field': TextField,
    },
    data () {
      return {
        username: '',
        password: '',

        usernameError: null,
        passwordError: null,

        isSubmitting: false,
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

        try {
          await this.$store.dispatch('login', {
            name: this.username,
            pass: this.password,
          });
          this.$router.push('/projects');
        } catch (error) {
          if (error.response.status === 400) {
            this.usernameError = error.response.data.message;
            this.passwordError = ' ';
          }
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
    margin-top: 40px;
    margin-bottom: 0;
  }

  a, a:hover, a:focus, a:active {
    color: #2ba6e1;
    opacity: 0.87;
    font-weight: 500;
    text-decoration: none;
  }
</style>

